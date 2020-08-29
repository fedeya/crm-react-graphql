import { InputType, Field } from 'type-graphql';

import { Client } from '@Entities/client.entity';

@InputType()
export class ClientInput implements Partial<Client> {
  @Field()
  name!: string;

  @Field()
  lastName!: string;

  @Field()
  email!: string;

  @Field()
  company!: string;

  @Field()
  phone!: string;
}
