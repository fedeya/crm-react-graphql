import { Resolver, Query, Arg } from 'type-graphql';

import { Order } from '@Entities/order.entity';

@Resolver(Order)
export class OrderResolver {}
