import { withUrqlClient } from 'next-urql';
import Link from 'next/link';

import Layout from '@Organisms/layout';
import ClientsTable from '@Organisms/clients-table';
import urqlConfig from '../config/urql';

const Home: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 mb-3">Clients</h1>
      <Link href="/new-client">
        <a className="my-3 form-button">New Client</a>
      </Link>
      <ClientsTable />
    </Layout>
  );
};

export default Home;
