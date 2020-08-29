import { withUrqlClient } from 'next-urql';

import Layout from '../components/layout';
import urqlConfig from '../config/urql';
import { useProductsQuery } from '../generated/graphql';

const Products: React.FC = () => {
  const [{ data }] = useProductsQuery();
  console.log(data);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-ight">Products</h1>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(Products);
