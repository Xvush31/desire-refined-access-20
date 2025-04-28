interface Regulation {
  region: string;
  restrictions: {
    ads: boolean;
    tracking: boolean;
  };
}

export const regulatoryFirewall = {
  regulations: null as Regulation | null,

  async init(): Promise<Regulation> {
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

      // Stocke les réglementations
      this.regulations = regulations;
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

      // Stocke les réglementations
      this.regulations = regulations;
      return regulations;
    }
  },

  getRegulations(): Regulation {
    if (!this.regulations) {
      throw new Error("Regulations not initialized. Call init() first.");
    }
    return this.regulations;
  },

  get currentRegion(): string {
    if (!this.regulations) {
      throw new Error("Regulations not initialized. Call init() first.");
    }
    return this.regulations.region;
  },

  requiresCookieNotice(): boolean {
    if (!this.regulations) {
      console.warn(
        "regulatoryFirewall n’est pas initialisé. Utilisation de la valeur par défaut (true)."
      );
      return true; // Par défaut, affiche la bannière si init n’a pas été appelé
    }
    // Affiche la bannière pour les utilisateurs en UE (RGPD)
    return this.regulations.region === "EU";
  },
};
