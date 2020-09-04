import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

import { Context } from '@Interfaces';
import { verifyToken } from '@Utils/auth';
import { authChecker } from '@Config/auth-checker';

export async function initServer() {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [__dirname + '/graphql/resolvers/**/*.ts'],
        validate: false,
        authChecker
      }),
      context: ({ req }): Context => {
        const token = req.headers['authorization'] || '';

        if (token) {
          try {
            const { user } = verifyToken(token);
            return {
              user
            };
          } catch (err) {
            return {};
          }
        }

        return {};
      }
    });
    const { url } = await server.listen();
    console.log(`Server listening on ${url}`);
  } catch (err) {
    console.log(err);
  }
}
