import { UnauthorizedException } from '~/lib/exceptions';
import { AuthTokenPayload, type Authentication } from './types';
import { UserRepository } from '~/modules/user/user.repository';
import { UserService } from '~/modules/user/user.service';
import jwt from 'jsonwebtoken';

export class JwtAuthentication implements Authentication {
  private readonly _userRepository = new UserRepository();
  private readonly _userService = new UserService();
  // underscore represents that this property is private.
  // Both methods of initilization of attributes is fine. Directly inside 
  // class body or indide constructor. Prefer constructor when to want to trigger
  // a particular sequence like in app.ts or you need input from outside.

  // Validate function to validate JWT 
  async validate(token: string) {
    // verify function checks that the token was issued / signed by the server when user tried 
    // to login. It has not expired.
    // Signature by server is done using an algo that consumes user info and JWT_SECRET.
    // This can be found in below create token function
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof payload === 'string') {
      throw new UnauthorizedException('invalid token content');
    }

    const parsedPayload = await AuthTokenPayload.safeParseAsync(payload);
    if (!parsedPayload.success) {
      throw new UnauthorizedException('invalid token content');
    }

    // Uses user.repository to find if parsed token is an id present in the DB.
    // Usr object has password as well as user id
    const user = await this._userRepository.findById(parsedPayload.data.id);
    if (user === null) {
      throw new UnauthorizedException('token is invalid');
    }
    // protect function just returns user id and not password. Idk why not doing it directly through
    // service layer and why directly interacting with repository
    return this._userService.protect(user);
  }

  public createToken(payload: AuthTokenPayload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    return token;
  }
}
