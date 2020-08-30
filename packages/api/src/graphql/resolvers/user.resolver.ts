import { Resolver, Query, Authorized, Ctx } from 'type-graphql';

import { User, UserModel } from '@Entities/user.entity';
import { Context } from '@Interfaces';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await UserModel.find().exec();

    return users;
  }

  @Authorized()
  @Query(() => User)
  async user(@Ctx() ctx: Context): Promise<User> {
    const user = await UserModel.findById(ctx.user?.id).exec();

    return user!;
  }
}
