import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import Layout from '@Organisms/layout';

const BestClients: React.FC = () => {
  return (
    <Layout>
      <h1>Best Clients</h1>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(BestClients);
