import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ID,
  Authorized,
  Ctx,
  FieldResolver,
  Root
} from 'type-graphql';
import { DocumentType } from '@typegoose/typegoose';

import { Client, ClientModel } from '@Entities/client.entity';
import { ClientInput } from '@Inputs/client.input';
import { Context } from '@Interfaces';
import { UserModel } from '@Entities/user.entity';

@Resolver(Client)
export class ClientResolver {
  @Authorized()
  @Query(() => [Client])
  async clients(@Ctx() ctx: Context): Promise<Client[]> {
    const clients = await ClientModel.find({ salesman: ctx.user?.id }).exec();

    return clients;
  }

  @Authorized()
  @Query(() => Client)
  async client(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<Client> {
    const client = await ClientModel.findById(id)
      .where('salesman', ctx.user?.id)
      .exec();

    if (!client) throw new Error('client not found');

    return client;
  }

  @Authorized()
  @Mutation(() => Client)
  async createClient(
    @Arg('input') input: ClientInput,
    @Ctx() ctx: Context
  ): Promise<Client> {
    const { email } = input;
    const client = await ClientModel.findOne({ email }).exec();
    if (client) throw new Error('client already registred');

    const newClient = new ClientModel(input);
    if (ctx.user) {
      newClient.salesman = ctx.user.id;
    }

    await newClient.save();

    return newClient;
  }

  @Authorized()
  @Mutation(() => Client)
  async updateClient(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: ClientInput,
    @Ctx() ctx: Context
  ): Promise<Client> {
    const client = await ClientModel.findByIdAndUpdate(id, input, { new: true })
      .where('salesman', ctx.user?.id)
      .exec();

    if (!client) throw new Error('client not found');

    return client;
  }

  @Authorized()
  @Mutation(() => Client)
  async deleteClient(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<Client> {
    const client = await ClientModel.findByIdAndDelete(id)
      .where('salesman', ctx.user?.id)
      .exec();

    if (!client) throw new Error('client not found');

    return client;
  }

  @FieldResolver()
  async salesman(
    @Root() client: DocumentType<Client>
  ): Promise<Client['salesman']> {
    await UserModel.populate(client, { path: 'salesman' });
    return client.salesman;
  }
}
