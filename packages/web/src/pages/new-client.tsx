import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import Layout from '@Organisms/layout';
import ClientForm from '@Organisms/client-form';

const NewClient: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800">New Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <ClientForm edit={false} />
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
