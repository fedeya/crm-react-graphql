import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import Layout from '@Organisms/layout';
import NewClientForm from '@Organisms/new-client-form';

const NewClient: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">New Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <NewClientForm />
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig, { ssr: true })(NewClient);
