
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { quantumBuffer } from '../quantum-buffer/quantum-buffer';

// Créer une classe Observable personnalisée pour Apollo sans dépendance à rxjs
export class Observable {
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

// Lien HTTP pour définir notre URL d'API GraphQL
const httpLink = createHttpLink({
  uri: 'https://api.xvush.com/graphql',
});

// Configuration du cache Apollo
const cache = new InMemoryCache();

// Création du client Apollo avec configuration minimale
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

// Initialiser le Protocole de Tampon Quantique en toute sécurité
export const initQuantumBuffer = async () => {
  try {
    console.log("Démarrage de l'initialisation du Tampon Quantique");
    await quantumBuffer.initialize();
    console.log("Protocole de Tampon Quantique initialisé pour Apollo Client");
    return true;
  } catch (error) {
    console.error("Échec de l'initialisation du Tampon Quantique:", error);
    return false;
  }
};
