import { withUrqlClient } from 'next-urql';
import Layout from '../components/layout';

import urqlConfig from '../config/urql';
import { useClientsQuery } from '../generated/graphql';

const Home: React.FC = () => {
  const [{ data, fetching }] = useClientsQuery();

  if (fetching) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">Clients</h1>
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
              <tr key={client.id}>
                <td className="border px-4 py-2">
                  {client.name} {client.lastName}
                </td>
                <td className="border px-4 py-2">{client.company}</td>
                <td className="border px-4 py-2">{client.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(Home);
