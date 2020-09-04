import { Client, Product, OrderProduct } from '@Generated/graphql';
import { Order } from '../../types';

export interface State {
  client: Partial<Client> | null;
  products: Partial<Product>[] | null;
  orders: (Pick<OrderProduct, 'id' | 'quantity'> & { price: number })[];
  total: string;
}

type Action =
  | {
      type: Order.SELECT_CLIENT;
      payload: State['client'];
    }
  | {
      type: Order.SELECT_PRODUCT;
      payload: State['products'];
    }
  | {
      type: Order.QUANTITY_PRODUCTS;
    }
  | {
      type: Order.ADD_ORDER;
      payload: Pick<OrderProduct, 'id' | 'quantity'> & { price: number };
    }
  | {
      type: Order.REMOVE_ORDER;
      payload: string;
    };

const OrderReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Order.SELECT_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    case Order.SELECT_PRODUCT:
      return {
        ...state,
        products: action.payload
      };
    case Order.QUANTITY_PRODUCTS:
      const total = state.orders.reduce((a, b) => a + b.price * b.quantity!, 0);

      return {
        ...state,
        total: total.toFixed(2)
      };
    case Order.ADD_ORDER:
      const existOrder =
        state.orders.length > 0 &&
        state.orders.find(order => order.id === action.payload.id);

      return {
        ...state,
        orders: existOrder
          ? state.orders.map(order =>
              order.id === action.payload.id ? action.payload : order
            )
          : [...state.orders, action.payload]
      };
    case Order.REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload)
      };
    default:
      return state;
  }
};

export default OrderReducer;
