import { InputType, Field } from 'type-graphql';
import { User } from '@Entities/user.entity';

@InputType()
export class UserInput implements Partial<User> {
  @Field(type => String)
  name!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}
