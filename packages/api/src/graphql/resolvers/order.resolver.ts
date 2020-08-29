import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  FieldResolver,
  Root,
  Authorized,
  ID
} from 'type-graphql';

import { Order, OrderModel, OrderState } from '@Entities/order.entity';
import { OrderInput } from '@Inputs/order.input';
import { ClientModel } from '@Entities/client.entity';
import { UserModel } from '@Entities/user.entity';
import { Context } from '@Interfaces';
import { ProductModel } from '@Entities/product.entity';
import { DocumentType } from '@typegoose/typegoose';

@Resolver(Order)
export class OrderResolver {
  @Authorized()
  @Query(() => [Order])
  async orders(
    @Arg('state', () => OrderState, { nullable: true }) state: OrderState,
    @Ctx() ctx: Context
  ): Promise<Order[]> {
    const orders = await OrderModel.find(state ? { state } : {})
      .where('salesman', ctx.user?.id)
      .exec();

    return orders;
  }

  @Authorized()
  @Query(() => Order)
  async order(
    @Arg('id', () => ID) id: string,
    @Ctx() ctx: Context
  ): Promise<Order> {
    const order = await OrderModel.findById(id)
      .where('salesman', ctx.user?.id)
      .exec();

    if (!order) throw new Error('order not found');

    return order;
  }

  @Authorized()
  @Mutation(() => Order)
  async createOrder(
    @Arg('input') input: OrderInput,
    @Ctx() ctx: Context
  ): Promise<Order> {
    const client = await ClientModel.findById(input.client)
      .where('salesman', ctx.user?.id)
      .exec();
    if (!client) throw new Error('client not found');

    for await (const { id, quantity } of input.order) {
      const product = await ProductModel.findById(id).exec();
      if (!product) throw new Error('product not found');

      if (quantity > product.quantity)
        throw new Error(`the product: ${product.name} exceeds the stock`);

      product.quantity -= quantity;
      await product.save();
    }

    const order = new OrderModel(input);
    order.salesman = ctx.user?.id;
    await order.save();

    return order;
  }

  @Authorized()
  @Mutation(() => Order)
  async updateOrder(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: OrderInput,
    @Ctx() ctx: Context
  ): Promise<Order> {
    const existOrder = await OrderModel.findById(id)
      .where('salesman', ctx.user?.id)
      .exec();
    if (!existOrder) throw new Error('order not found');

    for await (const { id, quantity } of input.order) {
      const product = await ProductModel.findById(id).exec();
      if (!product) throw new Error('product not found');

      for await (const orderProduct of existOrder.order) {
        if (orderProduct.quantity === quantity) continue;

        if (orderProduct.quantity > quantity) {
          product.quantity += orderProduct.quantity - quantity;
          continue;
        }

        if (quantity > orderProduct.quantity) {
          if (quantity - orderProduct.quantity > product.quantity)
            throw new Error(`the product: ${product.name} exceeds the stock`);
          product.quantity -= quantity - orderProduct.quantity;
          continue;
        }
      }

      await product.save();
    }

    const order = await OrderModel.findByIdAndUpdate(id, input, {
      new: true
    }).exec();

    return order!;
  }

  @Authorized()
  @Mutation(() => Order)
  async deleteOrder(
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ): Promise<Order> {
    const orderExist = await OrderModel.findById(id)
      .where('salesman', ctx.user?.id)
      .exec();

    if (!orderExist) throw new Error('order not found');

    if (
      orderExist.state === OrderState.PENDING ||
      orderExist.state === OrderState.CANCELED
    ) {
      for await (const { id, quantity } of orderExist.order) {
        console.log(id);
        const product = await ProductModel.findById(id).exec();
        if (!product) throw new Error('Product not found');
        product.quantity += quantity;

        await product.save();
      }
    }

    const order = await OrderModel.findByIdAndDelete(id)
      .where('salesman', ctx.user?.id)
      .exec();

    return order!;
  }

  @FieldResolver()
  async salesman(
    @Root() order: DocumentType<Order>
  ): Promise<Order['salesman']> {
    await UserModel.populate(order, { path: 'salesman' });

    return order.salesman;
  }

  @FieldResolver()
  async client(@Root() order: DocumentType<Order>): Promise<Order['client']> {
    await ClientModel.populate(order, { path: 'client' });

    return order.client;
  }
}
