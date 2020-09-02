import { useState } from 'react';
import Select from 'react-select';

const clients = [
  { id: '1', name: 'Fede' },
  { id: '2', name: 'Tobias' },
  { id: '3', name: 'Michael' },
  { id: '4', name: 'Nova' }
];

interface Client {
  id: number;
  name: string;
}

const AssignClient: React.FC = () => {
  const [client, setClient] = useState<any>([]);

  return (
    <Select
      options={clients}
      isMulti
      onChange={option => setClient(option!)}
      getOptionValue={({ id }) => id}
      placeholder="Select the Client"
      getOptionLabel={option => option.name}
    />
  );
};

export default AssignClient;
