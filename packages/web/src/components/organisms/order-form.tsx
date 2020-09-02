import { useContext } from 'react';

import AssignClient from '@Atoms/assign-client';
import AssignProducts from '@Atoms/assign-products';
import Total from '@Atoms/total';
import Button from '@Atoms/button';
import OrderResume from '@Molecules/order-resume';
import { OrderContext } from '../../context/orders/order-provider';

const OrderForm: React.FC = () => {
  const { orders } = useContext(OrderContext);

  return (
    <>
      <AssignClient />
      <AssignProducts />
      <OrderResume />
      <Total />
      <Button
        disabled={!!orders.find(order => order.quantity! <= 0)}
        onClick={console.log}
      >
        Add Product
      </Button>
    </>
  );
};

export default OrderForm;
