import { Resolver, Query } from 'type-graphql';

@Resolver()
export default class HelloResolver {
  @Query(returns => String)
  hello() {
    return 'World';
  }
}
