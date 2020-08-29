import { Resolver, Mutation, Arg } from 'type-graphql';
import argon2 from 'argon2';

import { Token } from '@Types/token.type';
import { AuthInput } from '@Inputs/auth.input';
import { UserModel } from '@Entities/user.entity';

import { generateToken } from '@Utils/auth';
import { UserInput } from '@Inputs/user.input';

@Resolver(Token)
export class AuthResolver {
  @Mutation(() => Token)
  async login(@Arg('input') input: AuthInput): Promise<Token> {
    const { email, password } = input;

    const user = await UserModel.findOne({ email }).exec();
    if (!user) throw new Error('user not exist');

    const correctPassword = await argon2.verify(user.password, password);
    if (!correctPassword) throw new Error('password is incorrect');

    return { token: generateToken(user, '24h') };
  }

  @Mutation(() => Token)
  async createUser(@Arg('input') input: UserInput): Promise<Token> {
    const user = await UserModel.findOne({ email: input.email }).exec();
    if (user) throw new Error('the user is already registed');

    input.password = await argon2.hash(input.password);

    const newUser = new UserModel(input);

    await newUser.save();

    return {
      token: generateToken(newUser, '24h')
    };
  }
}
