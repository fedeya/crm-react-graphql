import { createContext, useReducer } from 'react';

import OrderReducer, { State } from './order-reducer';
import { Client, Product, OrderProduct } from '@Generated/graphql';
import { Order } from 'src/types';

interface OrderState extends State {
  addClient(client: Partial<Client>): void;
  addProducts(product: Partial<Product>[]): void;
  addOrder(order: Partial<OrderProduct> & { price: number }): void;
  removeOrder(id: string): void;
}

export const OrderContext = createContext({} as OrderState);

const OrderProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, {
    client: null,
    products: [],
    total: '',
    orders: []
  });

  const addClient: OrderState['addClient'] = client => {
    dispatch({
      type: Order.SELECT_CLIENT,
      payload: client
    });
  };

  const addProducts: OrderState['addProducts'] = product => {
    dispatch({
      type: Order.SELECT_PRODUCT,
      payload: product
    });
  };

  const addOrder: OrderState['addOrder'] = order => {
    dispatch({
      type: Order.ADD_ORDER,
      payload: order
    });
    dispatch({
      type: Order.QUANTITY_PRODUCTS
    });
  };

  const removeOrder: OrderState['removeOrder'] = id => {
    dispatch({
      type: Order.REMOVE_ORDER,
      payload: id
    });
    dispatch({
      type: Order.QUANTITY_PRODUCTS
    });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        addClient,
        addProducts,
        addOrder,
        removeOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
