import { useContext } from 'react';
import { useClientsQuery } from '@Generated/graphql';
import Select from 'react-select';
import { OrderContext } from '../../context/orders/order-provider';

const AssignClient: React.FC = () => {
  const [{ data, fetching }] = useClientsQuery();
  const { addClient } = useContext(OrderContext);

  if (fetching) return <p>Loading...</p>;

  return (
    <Select
      options={data?.clients}
      onChange={option => addClient(option as any)}
      getOptionValue={option => option.id}
      placeholder="Select the Client"
      getOptionLabel={option => option.name}
      instanceId="assignClient"
    />
  );
};

export default AssignClient;
