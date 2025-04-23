
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create Apollo client with minimal configuration to avoid React conflicts
export const client = new ApolloClient({
  uri: 'https://api.xvush.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  // Disable dev tools to avoid potential React conflicts
  connectToDevTools: false,
});
