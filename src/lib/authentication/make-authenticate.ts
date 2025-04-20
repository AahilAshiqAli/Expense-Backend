import type { NextFunction, Request, Response } from 'express';
import type { SafeUser } from '~/modules/user/user.entity';
import type { Authentication } from './types';
import { UnauthorizedException } from '../exceptions';

interface AuthenticatedRequest {
  /** @property current user if the request is authenticated */
  user?: SafeUser;
}

export function makeAuthenticate(auth: Authentication) {
  // auth has interface Authentication whose implementation is in class 
  // JWTAuthentication which is in jwt-authentication.ts file
  return async function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (typeof authHeader === 'undefined') {
      throw new UnauthorizedException('authorization header missing');
    }

    const authToken = authHeader.split(' ').at(1);
    // same as req.header('Authorization')?.replace('Bearer', '');
    if (typeof authToken === 'undefined') {
      throw new UnauthorizedException(
        'authorization token not in proper format',
      );
    }

    const userInfo = await auth.validate(authToken);
    req.user = userInfo;
    next();
  };
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends AuthenticatedRequest {}
  }
}
