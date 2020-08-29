import { Resolver, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';

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

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) throw new Error('password is incorrect');

    return { token: generateToken(user, '24h') };
  }

  @Mutation(() => Token)
  async createUser(@Arg('input') input: UserInput): Promise<Token> {
    const user = await UserModel.findOne({ email: input.email }).exec();
    if (user) throw new Error('the user is already registed');

    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);

    const newUser = new UserModel(input);

    await newUser.save();

    return {
      token: generateToken(newUser, '24h')
    };
  }
}
