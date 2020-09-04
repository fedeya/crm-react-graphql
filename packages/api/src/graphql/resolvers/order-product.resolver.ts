import { Resolver, FieldResolver, Root } from 'type-graphql';
import { DocumentType } from '@typegoose/typegoose';

import { ProductModel } from '@Entities/product.entity';
import { OrderProduct } from '@Entities/order.entity';

@Resolver(OrderProduct)
export class OrderProductResolver {
  @FieldResolver()
  async product(@Root() root: DocumentType<OrderProduct>) {
    const product = await ProductModel.findById(root.id).exec();
    return product;
  }
}
