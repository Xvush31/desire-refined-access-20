
import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create Apollo client with minimal configuration
export const client = new ApolloClient({
  uri: 'https://api.xvush.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
  // Disable dev tools in production to avoid potential React conflicts
  connectToDevTools: process.env.NODE_ENV === 'development',
});
