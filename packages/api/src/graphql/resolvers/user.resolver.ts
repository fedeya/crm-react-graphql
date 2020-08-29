import { Resolver, Query, Arg } from 'type-graphql';

import { User, UserModel } from '@Entities/user.entity';
import { verifyToken } from '@Utils/auth';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find().exec();

    return users;
  }

  @Query(() => User)
  async user(@Arg('token') token: string): Promise<User> {
    const data = verifyToken(token);
    const user = await UserModel.findById(data.user.id).exec();

    return user!;
  }
}
