import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import { useProductsQuery } from '../generated/graphql';

const Products: React.FC = () => {
  const [{ data, fetching }] = useProductsQuery();

  if (fetching) return <p>Loading...</p>;

  return <h1 className="text-2xl text-gray-800">Products</h1>;
};

export default withUrqlClient(urqlConfig, { ssr: true })(Products);
