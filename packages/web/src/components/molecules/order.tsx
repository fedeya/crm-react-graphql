import { useState } from 'react';
import {
  Order as IOrder,
  OrderProduct,
  Client,
  Product,
  User
} from '@Generated/graphql';
import Select from 'react-select';

type OrderProps = {
  order: Pick<IOrder, 'id' | 'total' | 'state'> & {
    order: (Pick<OrderProduct, 'id' | 'quantity'> & {
      product: Pick<Product, 'name'>;
    })[];
    client: Pick<Client, 'id' | 'name'>;
    salesman: Pick<User, 'id' | 'name'>;
  };
};

const Order: React.FC<OrderProps> = ({ order }) => {
  const [state, setState] = useState({
    label: 'COMPLETED',
    value: 'COMPLETED'
  });

  return (
    <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
      <div>
        <p className="font-bold text-gray-800">Client: {order.client.name}</p>
        <h2 className="text-gray-800 font-bold mt-3">Order State</h2>
        <Select
          className="leading-tight w-1/2 text-center text-xs font-bold mt-2"
          options={[
            { label: 'COMPLETED', value: 'COMPLETED' },
            { label: 'PENDING', value: 'PENDING' },
            { label: 'CANCELED', value: 'CANCELED' }
          ]}
          onChange={option => setState(option as any)}
          value={state}
          defaultValue={{ label: 'COMPLETED', value: 'COMPLETED' }}
          instanceId="state"
        />
      </div>
      <div>
        <h2 className="text-gray-800 font-bold mt-2">Order Resume</h2>
        {order.order.map(article => (
          <div key={article.id} className="mt-4">
            <p className="text-sm text-gray-600">
              Product: {article.product.name}
            </p>
            <p className="text-sm text-gray-600">
              Quantity: {article.quantity}
            </p>
          </div>
        ))}
        <p className="text-gray-800 mt-3 font-bold">
          Total Price: <span className="font-light">${order.total}</span>
        </p>
        <button className="flex bg-red-800 text-white rounded leading-tight px-5 py-2 uppercase text-xs font-bold flex items-center">
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default Order;
