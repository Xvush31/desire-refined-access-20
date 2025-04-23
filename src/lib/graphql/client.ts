
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// HTTP link
const httpLink = createHttpLink({
  uri: 'https://api.xvush.com/graphql',
});

// Apollo cache
const cache = new InMemoryCache();

// Create Apollo client with minimal configuration
export const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
