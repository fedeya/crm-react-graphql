import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import Layout from '../components/layout';

const Orders: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">Orders</h1>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(Orders);
