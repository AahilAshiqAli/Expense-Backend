import type { SafeUser, User } from './user.entity';
import { UserRepository } from './user.repository';

export class UserService {
  private readonly _userRepository = new UserRepository();

  public protect(user: User): SafeUser {
    const { _id, email, username } = user;
    return { _id, email, username };
  }
}
