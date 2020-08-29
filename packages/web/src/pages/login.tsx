import { withUrqlClient } from 'next-urql';

const Login: React.FC = () => {
  return (
    <div className="bg-indigo-900 min-h-screen flex flex-col justify-center">
      <h1 className="text-center text-2xl text-white">Login</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
            <label>
              <span className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </span>
              <input
                className="form-field"
                type="email"
                placeholder="User Email"
              />
            </label>
            <label>
              <span className="block text-gray-700 text-sm font-bold my-2">
                Password
              </span>
              <input
                className="form-field"
                type="password"
                placeholder="**********"
              />
            </label>
            <button className="form-button">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
