import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';

export async function initServer() {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [__dirname + '/graphql/resolvers/**/*.ts'],
        validate: false
      })
    });
    const { url } = await server.listen();
    console.log(`Server listening on ${url}`);
  } catch (err) {
    console.log(err);
  }
}
