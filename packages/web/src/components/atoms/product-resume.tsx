import { useContext, useEffect, useState } from 'react';
import { Product } from '@Generated/graphql';
import Error from '@Atoms/error';
import { OrderContext } from '../../context/orders/order-provider';

type ProductResumeProps = {
  product: Partial<Product>;
};

const ProductResume: React.FC<ProductResumeProps> = ({ product }) => {
  const { addOrder, removeOrder } = useContext(OrderContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    addOrder({
      id: product.id as string,
      quantity: 1,
      price: product.price as number
    });
    return () => removeOrder(product.id as string);
    // eslint-disable-next-line
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > product.quantity!) {
      setError(true);
      return;
    }
    const order = {
      id: product.id as string,
      quantity: Number(e.target.value),
      price: product.price as number
    };

    setError(false);
    addOrder(order);
  };

  return (
    <>
      <div className="md:flex md:justify-between md:items-center mt-5">
        <div className="md:w-2/4 mb-2 md:mb-0">
          <p className="text-sm">{product.name}</p>
          <p>${product.price}</p>
        </div>
        <input
          type="number"
          placeholder="Quantity"
          className="shadow appearence-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline: none focus-shadow-outline md:ml-4"
          onChange={handleChange}
          min="1"
          defaultValue={1}
          max={product.quantity}
        />
      </div>
      {error && <Error message="the order exceeds the maximum of products" />}
    </>
  );
};
export default ProductResume;
