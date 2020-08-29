import { Resolver, Query } from 'type-graphql';

import { TopClient } from '@Types/top-client.type';
import { TopSeller } from '@Types/top-seller.type';
import { OrderState, OrderModel } from '@Entities/order.entity';

@Resolver()
export class TopResolver {
  @Query(() => [TopClient])
  async topClients(): Promise<TopClient[]> {
    const clients = await OrderModel.aggregate([
      { $match: { state: OrderState.COMPLETED } },
      {
        $group: {
          _id: '$client',
          total: { $sum: '$total' }
        }
      },
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $unwind: {
          path: '$client',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $limit: 10
      },
      {
        $sort: { total: -1 }
      }
    ]).exec();

    return clients;
  }

  @Query(() => [TopSeller])
  async topSellers(): Promise<TopSeller[]> {
    const sellers = await OrderModel.aggregate([
      { $match: { state: OrderState.COMPLETED } },
      {
        $group: {
          _id: '$salesman',
          total: { $sum: '$total' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'seller'
        }
      },
      {
        $unwind: {
          path: '$seller',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $limit: 3
      },
      {
        $sort: { total: -1 }
      }
    ]).exec();

    return sellers;
  }
}
