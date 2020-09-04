import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';

import Header from '@Atoms/header';
import Sidebar from '@Molecules/sidebar';

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>CRM</title>
      </Head>
      {router.pathname === '/login' || router.pathname === '/register' ? (
        <div className="bg-indigo-900 min-h-screen flex flex-col justify-center">
          {loading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            <main>{children}</main>
          )}
        </div>
      ) : (
        <div className="bg-gray-200 min-h-screen">
          <div className="sm:flex min-h-screen">
            <Sidebar />
            <div className="sm:w-2/3 xl:w-4/5 min-h-screen p-5">
              <Header />
              {loading ? <p>Loading...</p> : <main>{children}</main>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
