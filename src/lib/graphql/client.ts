
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { quantumBuffer } from '../quantum-buffer/quantum-buffer';

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

// Quantum Buffer Link pour intercepter les requêtes et utiliser le buffer prédictif
const quantumBufferLink = (operation, forward) => {
  const { operationName, variables } = operation;
  
  // Générer un ID pour cette requête
  const queryId = `${operationName}:${JSON.stringify(variables)}`;
  
  // Vérifier si cette requête est dans le buffer
  const cachedData = quantumBuffer.getFromBuffer(queryId);
  if (cachedData) {
    console.log(`[Quantum Buffer] Using cached result for ${operationName}`);
    // Si oui, retourner les données du buffer directement
    return new Observable(observer => {
      observer.next({ data: cachedData });
      observer.complete();
    });
  }
  
  // Sinon, laisser passer la requête et déclencher le préchargement prédictif
  const result = forward(operation);
  
  // Après l'exécution de la requête, déclencher le préchargement prédictif
  setTimeout(() => {
    quantumBuffer.predictAndBuffer({
      lastQuery: operationName,
      variables: variables
    });
  }, 0);
  
  return result;
};

// HTTP link to define our GraphQL API URL
// For now, we're using a mock URL that will be replaced with a real one later
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

// Initialize the Quantum Buffer Protocol
export const initQuantumBuffer = async () => {
  await quantumBuffer.initialize();
  console.log("Quantum Buffer Protocol initialized for Apollo Client");
};
