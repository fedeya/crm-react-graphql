import { useOrdersQuery } from '@Generated/graphql';
import Order from '@Molecules/order';

const OrderList: React.FC = () => {
  const [{ data, fetching }] = useOrdersQuery();

  if (fetching) return <p>Loading...</p>;

  console.log(data);

  return (
    <div className="mt-3">
      {data && data.orders.map(order => <Order key={order.id} order={order} />)}
    </div>
  );
};

export default OrderList;
