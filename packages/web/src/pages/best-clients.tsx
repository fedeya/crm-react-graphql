import dynamic from 'next/dynamic';
import { withUrqlClient } from 'next-urql';

import Layout from '@Organisms/layout';
import urqlConfig from '../config/urql';

const ClientChart = dynamic(() => import('@Molecules/client-chart'), {
  ssr: false
});

const BestClients: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 mb-3">Best Clients</h1>
      <ClientChart />
    </Layout>
  );
};

export default BestClients;
