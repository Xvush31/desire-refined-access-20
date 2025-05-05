
# Instructions d'intégration pour CreaVerse <-> XVush

Ce document explique comment configurer l'intégration entre XVush et CreaVerse pour permettre la synchronisation des vidéos gratuites et teasers entre les deux plateformes.

## 1. Configuration côté CreaVerse

Pour que l'intégration fonctionne correctement, vous devez implémenter les fonctionnalités suivantes sur `creaverse.xvush.com` :

### 1.1 Endpoint API pour les vidéos gratuites

Créer un endpoint API qui renvoie uniquement les vidéos gratuites et teasers :

```typescript
// Route: /api/free-videos
// Méthode: GET

// Structure de la réponse attendue :
[
  {
    "id": "video123",
    "performerId": "3", // ou creatorId
    "author": "Nom du créateur", // ou creatorName 
    "performerImage": "https://url-de-image.jpg", // ou creatorAvatar
    "thumbnail": "https://url-du-thumbnail.jpg",
    "title": "Titre de la vidéo",
    "description": "Description de la vidéo",
    "publishDate": "01/05/2025",
    "metrics": {
      "likes": 150,
      "views": 2500
    }
  },
  // autres vidéos...
]
```

### 1.2 Propriété "Shareable" pour le contenu

Ajouter une propriété `shareable` aux contenus qui permet aux créateurs de spécifier si un contenu gratuit doit être partagé avec XVush :

```typescript
interface ContentItem {
  // ... propriétés existantes
  shareable: boolean; // Si true, le contenu sera partagé avec XVush
}
```

### 1.3 Système de notification pour le nouveau contenu (Webhooks)

Implémenter un système qui notifie XVush lorsqu'un nouveau contenu gratuit et partageable est publié :

```typescript
// Lorsqu'un créateur publie un nouveau contenu :
const notifyXvush = async (contentItem: ContentItem) => {
  // Ne notifier que si le contenu est gratuit et partageable
  if (contentItem.type === "standard" && contentItem.shareable) {
    await axios.post("https://xvush.com/api/webhooks/new-content", contentItem);
  }
};
```

## 2. Configuration côté XVush

XVush est déjà configuré pour recevoir et afficher les vidéos CreaVerse via :

- `services/creaverseService.ts` : Gère la récupération des vidéos depuis l'API CreaVerse
- Intégration des vidéos dans le feed principal sur la page d'accueil

### 2.1 Endpoint Webhook (à implémenter si nécessaire)

Si vous activez le système de notification côté CreaVerse, vous devrez également implémenter ce endpoint webhook sur XVush :

```typescript
// Route: /api/webhooks/new-content
// Méthode: POST
// Cette route devra traiter les nouvelles publications et les ajouter au feed
```

## 3. Tests de l'intégration

Pour tester l'intégration :

1. Publiez une vidéo gratuite sur CreaVerse et marquez-la comme `shareable`
2. Vérifiez que cette vidéo apparaît dans le feed de XVush
3. Vérifiez que les liens de profil créateur sur ces vidéos redirigent vers le bon profil sur CreaVerse avec le format `/creator?id=creator{id}`

## 4. Dépannage

Si les vidéos ne s'affichent pas :

1. Vérifiez que l'endpoint `/api/free-videos` répond correctement sur CreaVerse
2. Vérifiez les logs CORS dans la console du navigateur
3. Assurez-vous que les domaines sont configurés pour permettre les requêtes cross-origin

## Contact

Pour toute question sur cette intégration, contactez l'équipe technique à team@xvush.com
