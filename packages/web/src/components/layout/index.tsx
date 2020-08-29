import Sidebar from './sidebar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM</title>
      </Head>
      {router.pathname === '/login' || router.pathname === '/register' ? (
        <div className="bg-indigo-900 min-h-screen flex flex-col justify-center">
          <main>{children}</main>
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="w-2/3 xl:w-4/5 min-h-screen p-5">{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
