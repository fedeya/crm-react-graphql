import { createContext, useReducer } from 'react';

import OrderReducer, { State } from './order-reducer';

interface OrderState extends State {}

export const OrderContext = createContext({} as OrderState);

const OrderProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, {});

  return (
    <OrderContext.Provider
      value={{
        ...state
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
