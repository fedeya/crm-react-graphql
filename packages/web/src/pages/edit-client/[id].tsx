import Layout from '@Organisms/layout';
import { withUrqlClient } from 'next-urql';

import ClientForm from '@Organisms/client-form';

import urqlConfig from '../../config/urql';

const EditClient: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">Edit Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <ClientForm edit />
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(EditClient);
