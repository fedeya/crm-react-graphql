import { useState, useEffect } from 'react';
import {
  Order as IOrder,
  OrderProduct,
  Client,
  Product,
  User,
  useUpdateOrderMutation,
  useDeleteOrderMutation
} from '@Generated/graphql';
import Swal from 'sweetalert2';
import Select from 'react-select';

type OrderProps = {
  order: Pick<IOrder, 'id' | 'total' | 'state'> & {
    order: (Pick<OrderProduct, 'id' | 'quantity' | '__typename'> & {
      product: Pick<Product, 'name' | '__typename'>;
    })[];
    client: Pick<Client, 'id' | 'name' | 'email' | 'phone' | 'lastName'>;
    salesman: Pick<User, 'id' | 'name'>;
  };
};

const Order: React.FC<OrderProps> = ({ order }) => {
  const [, updateOrder] = useUpdateOrderMutation();
  const [, deleteOrder] = useDeleteOrderMutation();
  const [state, setState] = useState({
    label: order.state,
    value: order.state
  });
  const [stateClass, setStateClass] = useState('');

  useEffect(() => {
    const orderClass = () => {
      if (state.value === 'PENDING') setStateClass('border-yellow-500');
      else if (state.value === 'COMPLETED') setStateClass('border-green-500');
      else setStateClass('border-red-500');
    };

    orderClass();
  }, [state]);

  const handleChange = async (option: typeof state) => {
    if (option.value === state.value) return;
    setState(option);
    const orderProducts = order.order.map(({ id, quantity }) => {
      return { id, quantity };
    });
    await updateOrder({
      id: order.id,
      input: {
        order: orderProducts,
        total: order.total,
        client: order.client.id,
        state: option.value
      }
    });
  };

  const confirmDeleteOrder = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (confirm.value) {
      if (order.id) await deleteOrder({ id: order.id });
      await Swal.fire('Deleted!', 'The order has been deleted.', 'success');
    }
  };

  return (
    <div
      className={`mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg ${stateClass} border-t-4`}
    >
      <div>
        <p className="font-bold text-gray-800">Client: {order.client.name}</p>
        <p className="my-2 items-center flex">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mail w-4 h-4 mr-1"
            data-darkreader-inline-fill=""
            data-darkreader-inline-stroke=""
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          {order.client.email}
        </p>
        <p className="my-2 items-center flex">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="phone w-4 h-4 mr-1"
            data-darkreader-inline-fill=""
            data-darkreader-inline-stroke=""
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          {order.client.phone}
        </p>
        <h2 className="text-gray-800 font-bold mt-3">Order State</h2>
        <Select
          className="leading-tight w-1/2 text-center text-xs font-bold mt-2"
          options={[
            { label: 'PENDING', value: 'PENDING' },
            { label: 'COMPLETED', value: 'COMPLETED' },
            { label: 'CANCELED', value: 'CANCELED' }
          ]}
          onChange={handleChange as any}
          value={state}
          instanceId={`state-${order.id}`}
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
        <button
          className="flex bg-red-800 text-white rounded leading-tight px-5 py-2 uppercase text-xs font-bold flex items-center mt-2"
          onClick={confirmDeleteOrder}
        >
          Delete Order
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 ml-2"
            data-darkreader-inline-fill=""
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Order;
