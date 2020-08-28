import { ObjectType, Field, Int, Float, ID } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field()
  @prop({ trim: true, required: true })
  name!: string;

  @Field(() => Int)
  @prop({ required: true })
  quantity!: number;

  @Field(() => Float)
  @prop({ required: true })
  price!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true }
});
