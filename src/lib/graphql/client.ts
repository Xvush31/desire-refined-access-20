
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { quantumBuffer } from '../quantum-buffer/quantum-buffer';

// Simplified Observable class for Apollo Client
class SimpleObservable {
  constructor(private subscribeFn: (observer: any) => any) {}
  
  subscribe(observer: any) {
    const subscription = this.subscribeFn(observer);
    return {
      unsubscribe: () => {
        if (subscription && typeof subscription.unsubscribe === 'function') {
          subscription.unsubscribe();
        }
      }
    };
  }
}

// Error link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// HTTP link
const httpLink = createHttpLink({
  uri: 'https://api.xvush.com/graphql',
});

// Apollo cache
const cache = new InMemoryCache();

// Create Apollo client with minimal configuration
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// Initialize quantum buffer without circular dependencies
export const initQuantumBuffer = async () => {
  try {
    console.log("Starting Quantum Buffer initialization");
    await quantumBuffer.initialize();
    return true;
  } catch (error) {
    console.error("Failed to initialize Quantum Buffer:", error);
    return false;
  }
};

// Export the Observable for use elsewhere if needed
export const Observable = SimpleObservable;
