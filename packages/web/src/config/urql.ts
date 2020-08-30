import { NextUrqlClientConfig } from 'next-urql';
import { dedupExchange, fetchExchange, Exchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import fetch from 'isomorphic-unfetch';
import Cookies from 'cookies';
import { pipe, tap } from 'wonka';
import { NextPageContext } from 'next';

const IS_SERVER = typeof window === 'undefined';

const invalidateClients = (cache: Cache) => {
  const allFields = cache.inspectFields('Query');

  const clientsQueries = allFields.filter(x => x.fieldName === 'clients');

  clientsQueries.forEach(({ fieldName }) => {
    cache.invalidate('Query', fieldName);
  });
};

const errorExchange = (ctx?: NextPageContext): Exchange => ({
  forward
}) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.toLowerCase().includes('access denied')) {
        if (IS_SERVER) {
          ctx?.res?.writeHead(302, { Location: '/login' });
          ctx?.res?.end();
        }
      }
    })
  );
};

const urqlConfig: NextUrqlClientConfig = (ssrExchange, ctx) => {
  const exchanges = [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login(_result, _args, cache, _info) {
            invalidateClients(cache);
            cache.invalidate('Query', 'user');
          },
          register(_result, _args, cache, _info) {
            invalidateClients(cache);
            cache.invalidate('Query', 'user');
          }
        }
      }
    }),
    errorExchange(ctx),
    ssrExchange,
    fetchExchange
  ];

  if (!IS_SERVER) exchanges.push(devtoolsExchange);

  return {
    url: 'http://localhost:4000',
    exchanges,
    fetchOptions: () => {
      let token: string | null | undefined;
      if (IS_SERVER && ctx) {
        const cookies = new Cookies(ctx.req!, ctx.res!);
        token = cookies.get('token');
      } else {
        token = localStorage.getItem('token');
      }

      return { headers: { authorization: token ?? '' } };
    },
    fetch
  };
};

export default urqlConfig;
