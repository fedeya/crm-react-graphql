import { ObjectType, Field, Int, Float, ID } from 'type-graphql';
import { Prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field()
  @Prop({ trim: true, required: true })
  name!: string;

  @Field(() => Int)
  @Prop({ required: true })
  quantity!: number;

  @Field(() => Float)
  @Prop({ required: true })
  price!: number;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true }
});
