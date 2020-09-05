import { useMemo } from 'react';
import Client from '@Molecules/client';
import { useClientsQuery } from '@Generated/graphql';
import { useAuthQuery } from '../../hooks/auth';

const ClientsTable: React.FC = () => {
  const [{ data, fetching }] = useAuthQuery(useClientsQuery);

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="overflow-x-scroll">
      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-indigo-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">Name</th>
            <th className="w-1/5 py-2">Company</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Delete</th>
            <th className="w-1/5 py-2">Edit</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data &&
            data.clients.map(client => (
              <Client client={client} key={client.id} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
