import { ObjectType, Field, ID, Int, registerEnumType } from 'type-graphql';
import { Prop, getModelForClass, Ref } from '@typegoose/typegoose';

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
  id!: string;

  @Field(() => Int)
  quantity!: number;
}

@ObjectType()
export class Order {
  @Field(() => ID)
  id!: string;

  @Field(() => [OrderProduct])
  @Prop({ required: true })
  order!: OrderProduct[];

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
