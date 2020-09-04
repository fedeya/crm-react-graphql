import { ObjectType, Field, ID, Int, registerEnumType } from 'type-graphql';
import { Prop, getModelForClass, Ref } from '@typegoose/typegoose';

import { Product } from './product.entity';
import { Client } from './client.entity';
import { User } from './user.entity';

export enum OrderState {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

registerEnumType(OrderState, {
  name: 'OrderState'
});

@ObjectType()
export class OrderProduct {
  @Field(() => ID)
  @Prop({ required: true })
  id!: string;

  @Field(() => Product)
  product!: Ref<Product>;

  @Field(() => Int)
  @Prop({ required: true })
  quantity!: number;
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id!: string;

  @Field(() => [OrderProduct])
  @Prop({ required: true, type: OrderProduct })
  order!: Partial<OrderProduct>[];

  @Field(() => Int)
  @Prop({ required: true })
  total!: number;

  @Field(() => Client)
  @Prop({ required: true, ref: Client })
  client: Ref<Client>;

  @Field(() => User)
  @Prop({ required: true, ref: User })
  salesman: Ref<User>;

  @Field(() => OrderState)
  @Prop({ default: OrderState.PENDING })
  state!: OrderState;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const OrderModel = getModelForClass(Order, {
  schemaOptions: {
    timestamps: true
  }
});
