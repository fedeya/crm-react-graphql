import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import bcrypt from 'bcrypt';

import { Token } from '@Types/token.type';
import { AuthInput } from '@Inputs/auth.input';
import { UserModel, User } from '@Entities/user.entity';

import { generateToken, verifyToken } from '@Utils/auth';

@Resolver()
export class AuthResolver {
  @Mutation(() => Token)
  async login(@Arg('input') input: AuthInput) {
    const { email, password } = input;

    const user = await UserModel.findOne({ email }).exec();
    if (!user) throw new Error('user not exist');

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) throw new Error('password is incorrect');

    return { token: generateToken(user, '24h') };
  }

  @Query(() => User)
  async user(@Arg('token') token: string) {
    const data = verifyToken(token);
    const user = await UserModel.findById(data.user.id).exec();

    return user;
  }
}
