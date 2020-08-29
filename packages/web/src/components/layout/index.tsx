import Header from './header';
import Head from 'next/head';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>CRM</title>
      </Head>
      <Header />
      {children}
    </>
  );
};

export default Layout;
