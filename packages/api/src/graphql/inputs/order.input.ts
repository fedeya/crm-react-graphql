import { InputType, Field, ID, Int } from 'type-graphql';
import { ObjectId } from 'mongodb';

import { Order, OrderProduct, OrderState } from '@Entities/order.entity';

@InputType()
export class OrderProductInput implements Partial<OrderProduct> {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  quantity!: number;
}

@InputType()
export class OrderInput implements Partial<Order> {
  @Field(() => [OrderProductInput])
  order!: OrderProductInput[];

  @Field()
  total!: number;

  @Field(() => ID)
  client!: ObjectId;

  @Field(() => OrderState, { nullable: true })
  state!: OrderState;
}
