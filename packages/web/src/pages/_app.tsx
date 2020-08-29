import { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import Router from 'next/router';

import Layout from '../components/layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
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
    <Layout>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
  );
};

export default App;
