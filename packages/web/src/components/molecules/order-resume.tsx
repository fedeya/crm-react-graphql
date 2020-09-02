import { useContext } from 'react';
import { OrderContext } from '../../context/orders/order-provider';
import ProductResume from '@Atoms/product-resume';

const OrderResume: React.FC = () => {
  const { products } = useContext(OrderContext);

  return (
    <>
      {products &&
        products.map(product => (
          <ProductResume key={product.id} product={product} />
        ))}
    </>
  );
};

export default OrderResume;
