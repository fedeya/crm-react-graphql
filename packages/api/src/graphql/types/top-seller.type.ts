import { ObjectType, Field, Int } from 'type-graphql';

import { User } from '@Entities/user.entity';

@ObjectType()
export class TopSeller {
  @Field(() => Int)
  total!: number;

  @Field(() => User)
  seller!: User;
}
