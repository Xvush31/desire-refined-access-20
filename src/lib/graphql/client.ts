
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
// Utiliser le tampon quantique local au lieu de rxjs
import { Observable, quantumBuffer } from '../quantum-buffer/quantum-buffer';

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

// Lien personnalisé pour l'intégration du tampon quantique
const quantumBufferLink = (operation, forward) => {
  const { operationName, variables } = operation;
  
  // Générer un ID pour cette requête
  const queryId = `${operationName}:${JSON.stringify(variables)}`;
  
  // Vérifier si cette requête est dans le tampon
  const cachedData = quantumBuffer.getFromBuffer(queryId);
  if (cachedData) {
    console.log(`[Quantum Buffer] Utilisation du résultat en cache pour ${operationName}`);
    // Si oui, renvoyer directement les données du tampon
    return new Observable(observer => {
      observer.next({ data: cachedData });
      observer.complete();
      return { unsubscribe: () => {} };
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

// Lien HTTP pour définir notre URL d'API GraphQL
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
