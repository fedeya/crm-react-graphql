import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql';

import { Product, ProductModel } from '@Entities/product.entity';
import { ProductInput } from '@Inputs/product.input';

@Resolver(Product)
export class ProductResolver {
  @Query(returns => [Product])
  async getProducts() {
    const products = await ProductModel.find().exec();

    return products;
  }

  @Query(returns => Product)
  async getProduct(@Arg('id', type => ID) id: string) {
    const product = await ProductModel.findById(id).exec();

    if (!product) throw new Error('product not found');

    return product;
  }

  @Mutation(returns => Product)
  async createProduct(@Arg('input') input: ProductInput) {
    const product = new ProductModel(input);

    await product.save();

    return product;
  }

  @Mutation(returns => Product)
  async updateProduct(
    @Arg('id', type => ID) id: string,
    @Arg('input') input: ProductInput
  ) {
    const product = await ProductModel.findByIdAndUpdate(id, input, {
      new: true
    });
    if (!product) throw new Error('product not found');

    return product;
  }

  @Mutation(returns => Product)
  async deleteProduct(@Arg('id', type => ID) id: string) {
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) throw new Error('product not found');

    return product;
  }
}
