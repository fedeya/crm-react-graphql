import { useContext } from 'react';
import { useRouter } from 'next/router';

import AssignClient from '@Atoms/assign-client';
import AssignProducts from '@Atoms/assign-products';
import Total from '@Atoms/total';
import Button from '@Atoms/button';
import Error from '@Atoms/error';
import OrderResume from '@Molecules/order-resume';
import { useCreateOrderMutation } from '@Generated/graphql';
import { OrderContext } from '../../context/orders/order-provider';

const OrderForm: React.FC = () => {
  const { orders, client, total } = useContext(OrderContext);
  const [{ error }, createOrder] = useCreateOrderMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !orders || !total) return;

    const order = orders.map(({ id, quantity }) => ({ id, quantity }));

    const { error } = await createOrder({
      input: {
        client: client.id!,
        order: order,
        total: Number(total)
      }
    });
    if (!error) await router.push('/orders');
    else console.log(error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Error message={error?.graphQLErrors[0]?.message} />
      <AssignClient />
      <AssignProducts />
      <OrderResume />
      <Total />
      <Button
        disabled={!!orders.find(order => order.quantity! <= 0)}
        type="submit"
      >
        Add Product
      </Button>
    </form>
  );
};

export default OrderForm;
