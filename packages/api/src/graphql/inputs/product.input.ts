import { InputType, Field, Int, Float } from 'type-graphql';

import { Product } from '@Entities/product.entity';

@InputType()
export class ProductInput implements Partial<Product> {
  @Field()
  name!: string;

  @Field(type => Int)
  quantity!: number;

  @Field(type => Float)
  price!: number;
}
