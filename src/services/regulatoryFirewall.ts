interface Regulation {
  region: string;
  restrictions: {
    ads: boolean;
    tracking: boolean;
  };
  minAge: number;
  dataRetentionDays: number;
  requiresContentLabeling: boolean;
}

export const regulatoryFirewall = {
  regulations: null as Regulation | null,

  async init(): Promise<Regulation> {
    try {
      const region = "EU"; // Région par défaut
      console.log("Région définie:", region);

      const regulations = {
        region,
        restrictions:
          region === "EU"
            ? { ads: false, tracking: false }
            : { ads: true, tracking: true },
        minAge: region === "EU" ? 16 : 13,
        dataRetentionDays: region === "EU" ? 90 : 180,
        requiresContentLabeling: region === "EU",
      };
      console.log("Réglementations appliquées:", regulations);

      this.regulations = regulations;
      return regulations;
    } catch (error) {
      console.error("Erreur lors de la détection de région:", error);
      const region = "EU";
      console.log(
        "Utilisation de la langue comme repli. Région définie:",
        region
      );
      const regulations = {
        region,
        restrictions: { ads: false, tracking: false },
        minAge: 16,
        dataRetentionDays: 90,
        requiresContentLabeling: true,
      };
      console.log("Réglementations appliquées:", regulations);

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
      return true;
    }
    return this.regulations.region === "EU";
  },
};
