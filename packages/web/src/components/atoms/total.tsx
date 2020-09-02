import { useContext } from 'react';
import { OrderContext } from '../../context/orders/order-provider';

const Total: React.FC = () => {
  const { total } = useContext(OrderContext);

  return (
    <div className="flex items-center mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-200">
      <h2>Total</h2>
      <p>${total}</p>
    </div>
  );
};

export default Total;
