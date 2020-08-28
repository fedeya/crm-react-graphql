import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcrypt';

import { User, UserModel } from '@Entities/user.entity';
import { UserInput } from '@Inputs/user.input';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await UserModel.find().exec();

    return users;
  }

  @Mutation(() => User)
  async createUser(@Arg('input') input: UserInput) {
    const user = await UserModel.findOne({ email: input.email }).exec();
    if (user) throw new Error('the user is already registed');

    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);

    const newUser = new UserModel(input);

    await newUser.save();

    return newUser;
  }
}
