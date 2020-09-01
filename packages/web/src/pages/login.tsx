import { withUrqlClient } from 'next-urql';

import urqlConfig from '../config/urql';
import LoginForm from '@Organisms/login-form';
import Layout from '@Organisms/layout';

const Login: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-center text-2xl text-white">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(urqlConfig)(Login);
