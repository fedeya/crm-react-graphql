import { NextUrqlClientConfig } from 'next-urql';
import { dedupExchange, fetchExchange, Exchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange, Cache } from '@urql/exchange-graphcache';
import fetch from 'isomorphic-unfetch';
import Cookies from 'cookies';
import axios from 'axios';
import { pipe, tap } from 'wonka';
import {
  ClientsDocument,
  ProductsDocument,
  OrdersDocument
} from '../generated/graphql';
import { NextPageContext } from 'next';

const isServer = typeof window === 'undefined';

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
    tap(({ error, ...other }) => {
      if (isServer && ctx) {
        if (ctx.res && !ctx.res.headersSent) {
          if (error?.message.toLowerCase().includes('access denied')) {
            try {
              ctx.res.writeHead(302, { Location: '/login' });
              ctx.res.end();
            } catch (err) {}
          }
        }
      }
    })
  );
};

const authExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(async ({ data }) => {
      if (!isServer) {
        if (data && data.login) {
          await axios.post('/api/user', { token: data.login.token });
        } else if (data && data.register) {
          await axios.post('/api/user', { token: data.register.token });
        }
      }
    })
  );
};

const urqlConfig: NextUrqlClientConfig = (ssrExchange, ctx) => {
  const exchanges = [
    dedupExchange,
    cacheExchange({
      keys: {
        TopSeller: () => null,
        TopClient: () => null,
        User: (user: any) => user.id
      },
      updates: {
        Mutation: {
          login(_result, _args, cache, _info) {
            invalidateClients(cache);
            cache.invalidate('Query', 'user');
          },
          register(_result, _args, cache, _info) {
            invalidateClients(cache);
            cache.invalidate('Query', 'user');
          },
          createClient(result, _args, cache, _info) {
            cache.updateQuery({ query: ClientsDocument }, (data: any) => {
              if (!data || !data.clients) return data;
              data.clients.push(result.createClient);
              return data;
            });
          },
          deleteClient(_result, args, cache, _info) {
            cache.invalidate({ __typename: 'Client', id: args.id as string });
          },
          createProduct(result, _args, cache, _info) {
            cache.updateQuery({ query: ProductsDocument }, (data: any) => {
              if (!data || !data.products) return data;
              data.products.push(result.createProduct);
              return data;
            });
          },
          deleteProduct(_result, args, cache, _info) {
            cache.invalidate({ __typename: 'Product', id: args.id as string });
          },
          createOrder(result, _args, cache, _info) {
            cache.updateQuery({ query: OrdersDocument }, (data: any) => {
              if (!data || !data.orders) return data;
              data.orders.push(result.createOrder);
              return data;
            });
          },
          deleteOrder(_result, args, cache, _info) {
            cache.invalidate({ __typename: 'Order', id: args.id as string });
          }
        }
      }
    }),
    ssrExchange,
    errorExchange(ctx),
    authExchange,
    fetchExchange
  ];

  if (!isServer) exchanges.unshift(devtoolsExchange);

  return {
    url: 'http://localhost:4000',
    exchanges,
    fetchOptions: () => {
      let token: string | null | undefined;
      if (isServer && ctx) {
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
