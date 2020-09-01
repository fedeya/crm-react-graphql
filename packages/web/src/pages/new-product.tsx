import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import Layout from '@Organisms/layout';
import NewProductForm from '@Organisms/new-product-form';

const NewProduct: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">New Product</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <NewProductForm />
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(NewProduct);
