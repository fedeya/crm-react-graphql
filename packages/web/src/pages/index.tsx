import { withUrqlClient } from 'next-urql';
import Link from 'next/link';

import Layout from '@Organisms/layout';
import ClientsTable from '@Molecules/clients-table';
import urqlConfig from '../config/urql';
import { useClientsQuery } from '@Generated/graphql';

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
      <Link href="/new-client">
        <a className="my-3 form-button">New Client</a>
      </Link>
      <ClientsTable data={data} />
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(Home);
