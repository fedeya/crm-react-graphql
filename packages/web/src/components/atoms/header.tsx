import { useRouter } from 'next/router';
import axios from 'axios';

import { useUserQuery } from '@Generated/graphql';
import { useAuthQuery } from '../../hooks/auth';

const Header: React.FC = () => {
  const [{ data, fetching }] = useAuthQuery(useUserQuery);
  const router = useRouter();

  if (fetching) return <p>Loading...</p>;

  const handleClick = async () => {
    await axios.post('/api/user', { token: '' });

    await router.push('/login');
  };

  return (
    <header className="sm:flex sm:justify-between mb-2">
      <p className="mr-2 mb-5 lg:mb-0">Hello: {data?.user.name}</p>
      <button
        onClick={handleClick}
        type="button"
        className="bg-purple-800 w-full sm:w-auto font-bold uppercase text-xs rouded py-1 px-2 text-white shadow-md"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
