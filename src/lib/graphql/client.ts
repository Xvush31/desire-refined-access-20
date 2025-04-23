
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create a simple Apollo Client instance with minimal configuration
export const client = new ApolloClient({
  uri: 'https://api.xvush.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
