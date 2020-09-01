import { withUrqlClient } from 'next-urql';
import urqlConfig from '../config/urql';

import Layout from '@Organisms/layout';
import RegisterForm from '@Organisms/register-form';

const Register: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-center text-2xl text-white">Register</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig)(Register);
