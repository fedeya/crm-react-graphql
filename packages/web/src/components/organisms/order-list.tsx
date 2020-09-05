import { useOrdersQuery } from '@Generated/graphql';
import Order from '@Molecules/order';

import { useAuthQuery } from '../../hooks/auth';

const OrderList: React.FC = () => {
  const [{ data, fetching }] = useAuthQuery(useOrdersQuery);

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="mt-3">
      {data && data.orders.map(order => <Order key={order.id} order={order} />)}
    </div>
  );
};

export default OrderList;
