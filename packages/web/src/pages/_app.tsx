import NextApp, { AppProps } from 'next/app';
import { withUrqlClient, NextUrqlAppContext } from 'next-urql';
import Cookies from 'cookies';

import '../styles/index.css';

import urqlConfig from '../config/urql';
import OrderProvider from '../context/orders/order-provider';
import AuthProvider from '../context/auth/auth-provider';

const App = ({
  Component,
  pageProps,
  token
}: AppProps & { token?: string }) => {
  return (
    <AuthProvider initialToken={token}>
      <OrderProvider>
        <Component {...pageProps} />
      </OrderProvider>
    </AuthProvider>
  );
};

App.getInitialProps = async (ctx: NextUrqlAppContext) => {
  const appProps = NextApp.getInitialProps(ctx);
  let token;
  const isServer = typeof window === 'undefined';
  if (isServer && ctx.ctx && ctx.ctx.req && ctx.ctx.res) {
    const cookies = new Cookies(ctx.ctx.req, ctx.ctx.res);
    token = cookies.get('token');
  }

  return {
    ...appProps,
    token
  };
};

export default withUrqlClient(urqlConfig, { ssr: true })(
  // @ts-ignore
  App
);
