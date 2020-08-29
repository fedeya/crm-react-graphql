import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';

import { Product, ProductModel } from '@Entities/product.entity';
import { ProductInput } from '@Inputs/product.input';

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    const products = await ProductModel.find().exec();

    return products;
  }

  @Query(() => Product)
  async product(@Arg('id', () => ID) id: string): Promise<Product> {
    const product = await ProductModel.findById(id).exec();

    if (!product) throw new Error('product not found');

    return product;
  }

  @Query(() => [Product])
  async searchProduct(@Arg('text') text: string): Promise<Product[]> {
    const products = await ProductModel.find({
      $text: { $search: text }
    })
      .limit(10)
      .exec();

    return products;
  }

  @Mutation(() => Product)
  async createProduct(@Arg('input') input: ProductInput): Promise<Product> {
    const product = new ProductModel(input);

    await product.save();

    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg('id', () => ID) id: string,
    @Arg('input') input: ProductInput
  ): Promise<Product> {
    const product = await ProductModel.findByIdAndUpdate(id, input, {
      new: true
    });
    if (!product) throw new Error('product not found');

    return product;
  }

  @Mutation(() => Product)
  async deleteProduct(@Arg('id', () => ID) id: string): Promise<Product> {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) throw new Error('product not found');

    return product;
  }
}
