import Sidebar from './sidebar';
import Head from 'next/head';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM</title>
      </Head>
      <div className="bg-gray-200 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="w-2/3 xl:w-4/5 min-h-screen p-5">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
