import { useContext } from 'react';
import { useProductsQuery } from '@Generated/graphql';
import Select from 'react-select';
import { OrderContext } from '../../context/orders/order-provider';

const AssignProducts: React.FC = () => {
  const [{ data, fetching }] = useProductsQuery();
  const { addProducts } = useContext(OrderContext);

  if (fetching) return <p>Loading...</p>;

  return (
    <Select
      options={data?.products}
      isMulti
      className="my-3"
      onChange={option => addProducts(option as any)}
      getOptionValue={option => option.id}
      placeholder="Select Products"
      getOptionLabel={option => `${option.name} - ${option.quantity} available`}
      instanceId="assignProduct"
    />
  );
};

export default AssignProducts;
