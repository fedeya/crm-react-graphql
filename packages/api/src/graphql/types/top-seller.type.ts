import { ObjectType, Field, Int } from 'type-graphql';

import { User } from '@Entities/user.entity';

@ObjectType()
export class TopSeller {
  @Field()
  total!: number;

  @Field(() => User)
  seller!: User;
}
