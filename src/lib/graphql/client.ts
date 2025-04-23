
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// Import Observable from the local quantum-buffer module instead of using rxjs
import { Observable, quantumBuffer } from '../quantum-buffer/quantum-buffer';

// Error link to intercept and handle GraphQL errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Custom link for quantum buffer integration
const quantumBufferLink = (operation, forward) => {
  const { operationName, variables } = operation;
  
  // Generate an ID for this query
  const queryId = `${operationName}:${JSON.stringify(variables)}`;
  
  // Check if this query is in the buffer
  const cachedData = quantumBuffer.getFromBuffer(queryId);
  if (cachedData) {
    console.log(`[Quantum Buffer] Using cached result for ${operationName}`);
    // If yes, return the buffer data directly
    return new Observable(observer => {
      observer.next({ data: cachedData });
      observer.complete();
      return { unsubscribe: () => {} };
    });
  }
  
  // Otherwise, let the request pass through and trigger predictive preloading
  const result = forward(operation);
  
  // After the query executes, trigger predictive preloading
  setTimeout(() => {
    quantumBuffer.predictAndBuffer({
      lastQuery: operationName,
      variables: variables
    });
  }, 0);
  
  return result;
};

// HTTP link to define our GraphQL API URL
const httpLink = createHttpLink({
  uri: 'https://api.xvush.com/graphql',
});

// Apollo cache configuration
const cache = new InMemoryCache();

// Creating the Apollo client
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// Initialize the Quantum Buffer Protocol safely
export const initQuantumBuffer = async () => {
  try {
    console.log("Starting Quantum Buffer initialization");
    await quantumBuffer.initialize();
    console.log("Quantum Buffer Protocol initialized for Apollo Client");
    return true;
  } catch (error) {
    console.error("Failed to initialize Quantum Buffer:", error);
    return false;
  }
};
