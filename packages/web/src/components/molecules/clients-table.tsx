import Client from '@Atoms/client';
import { ClientsQuery } from '@Generated/graphql';

type ClientsTableProps = {
  data?: ClientsQuery;
};

const ClientsTable: React.FC<ClientsTableProps> = ({ data }) => {
  return (
    <table className="table-auto shadow-md mt-10 w-full w-lg">
      <thead className="bg-indigo-800">
        <tr className="text-white">
          <th className="w-1/5 py-2">Name</th>
          <th className="w-1/5 py-2">Company</th>
          <th className="w-1/5 py-2">Email</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {data &&
          data.clients.map(client => (
            <Client client={client} key={client.id} />
          ))}
      </tbody>
    </table>
  );
};

export default ClientsTable;
