import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export const apolloClient = new ApolloClient({
  // MSW intercepts this URL so no real server is needed
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
  },
});
