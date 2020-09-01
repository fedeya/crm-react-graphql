import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import { useProductsQuery } from '@Generated/graphql';
import Layout from '@Organisms/layout';

const Products: React.FC = () => {
  const [{ data, fetching }] = useProductsQuery();

  if (fetching)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">Products</h1>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(Products);
