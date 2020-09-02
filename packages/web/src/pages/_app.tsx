import { AppProps } from 'next/app';
import OrderProvider from '../context/orders/order-provider';
import '../styles/index.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <OrderProvider>
      <Component {...pageProps} />
    </OrderProvider>
  );
};

export default App;
