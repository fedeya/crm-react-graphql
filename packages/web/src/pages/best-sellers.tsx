import dynamic from 'next/dynamic';
import { withUrqlClient } from 'next-urql';

import Layout from '@Organisms/layout';
import urqlConfig from '../config/urql';

const SellerChart = dynamic(() => import('@Molecules/seller-chart'), {
  ssr: false
});

const BestSellers: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 mb-3">Best Sellers</h1>
      <SellerChart />
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(BestSellers);
