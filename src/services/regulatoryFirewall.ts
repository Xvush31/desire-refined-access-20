export const regulatoryFirewall = {
  async init() {
    try {
      // Commente la requête à ipapi.co pour éviter l’erreur CORS
      /*
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const region = data.region || 'EU'; // Par défaut à 'EU' si région non détectée
      */
      const region = "EU"; // Région par défaut
      console.log("Région définie:", region);

      // Applique les réglementations basées sur la région
      const regulations = {
        region,
        restrictions:
          region === "EU"
            ? { ads: false, tracking: false }
            : { ads: true, tracking: true },
      };
      console.log("Réglementations appliquées:", regulations);

      return regulations;
    } catch (error) {
      console.error("Erreur lors de la détection de région:", error);
      // Repli sur une région par défaut
      const region = "EU";
      console.log(
        "Utilisation de la langue comme repli. Région définie:",
        region
      );
      const regulations = {
        region,
        restrictions: { ads: false, tracking: false },
      };
      console.log("Réglementations appliquées:", regulations);
      return regulations;
    }
  },
};
