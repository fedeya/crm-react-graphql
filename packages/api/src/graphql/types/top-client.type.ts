import { ObjectType, Field, Int } from 'type-graphql';

import { Client } from '@Entities/client.entity';

@ObjectType()
export class TopClient {
  @Field()
  total!: number;

  @Field(() => Client)
  client!: Client;
}
