import { NextUrqlClientConfig } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';

const IS_SERVER = typeof window === 'undefined';

const urqlConfig: NextUrqlClientConfig = ssrExchange => {
  const exchanges = [dedupExchange, cacheExchange, ssrExchange, fetchExchange];

  if (!IS_SERVER) exchanges.push(devtoolsExchange);

  return {
    url: 'http://localhost:4000',
    exchanges
  };
};

export default urqlConfig;
