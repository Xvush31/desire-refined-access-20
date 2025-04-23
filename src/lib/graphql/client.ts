
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Lien d'erreur pour intercepter et gérer les erreurs GraphQL
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Lien HTTP pour définir l'URL de notre API GraphQL
// Pour l'instant, nous utilisons une URL fictive qui sera remplacée par une réelle plus tard
const httpLink = createHttpLink({
  uri: 'https://api.xvush.com/graphql',
});

// Configuration du cache Apollo
const cache = new InMemoryCache();

// Création du client Apollo
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
