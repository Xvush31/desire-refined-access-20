
/**
 * Service pour la protection du contenu (Triple Shield™)
 * Offre trois niveaux de protection:
 * 1. Filigranes dynamiques invisibles
 * 2. Détection de captures d'écran
 * 3. Contrôle d'accès avancé
 */

// Types pour les options de protection
export interface WatermarkOptions {
  text: string;
  opacity: number;
  density: 'low' | 'medium' | 'high';
  includeUserInfo: boolean;
  includeTimestamp: boolean;
}

export interface ScreenCaptureOptions {
  enableDetection: boolean;
  enablePrevention: boolean;
  alertUser: boolean;
  alertCreator: boolean;
}

export interface ContentProtectionOptions {
  enableWatermark: boolean;
  watermarkOptions: WatermarkOptions;
  enableScreenCaptureProtection: boolean;
  screenCaptureOptions: ScreenCaptureOptions;
  enableEncryption: boolean;
}

// Paramètres par défaut
export const DEFAULT_WATERMARK_OPTIONS: WatermarkOptions = {
  text: 'XDose Protected',
  opacity: 0.15,
  density: 'medium',
  includeUserInfo: true,
  includeTimestamp: true
};

export const DEFAULT_SCREEN_CAPTURE_OPTIONS: ScreenCaptureOptions = {
  enableDetection: true,
  enablePrevention: false, // La prévention peut ne pas fonctionner sur tous les navigateurs
  alertUser: true,
  alertCreator: true
};

export const DEFAULT_CONTENT_PROTECTION_OPTIONS: ContentProtectionOptions = {
  enableWatermark: true,
  watermarkOptions: DEFAULT_WATERMARK_OPTIONS,
  enableScreenCaptureProtection: true,
  screenCaptureOptions: DEFAULT_SCREEN_CAPTURE_OPTIONS,
  enableEncryption: true
};

/**
 * Classe principale pour la protection du contenu
 */
class ContentProtectionService {
  private options: ContentProtectionOptions;
  private userId: string | null = null;
  private contentId: string | null = null;
  private creatorId: string | null = null;
  private watermarkInstances: HTMLDivElement[] = [];
  private snapshotInterval: number | null = null;
  private videoBuffer: ImageData[] = [];
  
  constructor(options: Partial<ContentProtectionOptions> = {}) {
    this.options = {
      ...DEFAULT_CONTENT_PROTECTION_OPTIONS,
      ...options,
      watermarkOptions: {
        ...DEFAULT_WATERMARK_OPTIONS,
        ...(options.watermarkOptions || {})
      },
      screenCaptureOptions: {
        ...DEFAULT_SCREEN_CAPTURE_OPTIONS,
        ...(options.screenCaptureOptions || {})
      }
    };
  }

  /**
   * Initialise le service de protection pour un contenu spécifique
   */
  public initialize(contentId: string, creatorId: string, userId?: string): void {
    this.contentId = contentId;
    this.creatorId = creatorId;
    this.userId = userId || null;
    
    if (this.options.enableScreenCaptureProtection) {
      this.setupScreenCaptureDetection();
    }
    
    console.log(`[Triple Shield™] Protection initialisée pour le contenu ${contentId}`);
  }
  
  /**
   * Applique un filigrane dynamique à un élément
   */
  public applyWatermark(element: HTMLElement): void {
    if (!this.options.enableWatermark) return;
    
    const watermark = this.createWatermarkElement();
    element.style.position = 'relative';
    element.appendChild(watermark);
    this.watermarkInstances.push(watermark);
    
    // Rotation du filigrane à intervalles réguliers pour contrer les outils d'édition
    this.rotateWatermark(watermark);
  }
  
  /**
   * Crée un élément de filigrane avec les informations dynamiques
   */
  private createWatermarkElement(): HTMLDivElement {
    const watermark = document.createElement('div');
    const options = this.options.watermarkOptions;
    const density = this.getDensityConfig(options.density);
    
    let watermarkText = options.text;
    
    // Ajouter des informations de l'utilisateur si activé
    if (options.includeUserInfo && this.userId) {
      watermarkText += ` | ID:${this.userId.substring(0, 6)}`;
    }
    
    // Ajouter un horodatage si activé
    if (options.includeTimestamp) {
      const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').substring(0, 14);
      watermarkText += ` | ${timestamp}`;
    }
    
    // Générer un identifiant unique pour le filigrane
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    watermarkText += ` | ${uniqueId}`;
    
    watermark.innerText = watermarkText;
    watermark.style.position = 'absolute';
    watermark.style.inset = '0';
    watermark.style.display = 'grid';
    watermark.style.gridTemplateColumns = `repeat(${density.cols}, 1fr)`;
    watermark.style.gridTemplateRows = `repeat(${density.rows}, 1fr)`;
    watermark.style.alignItems = 'center';
    watermark.style.justifyItems = 'center';
    watermark.style.pointerEvents = 'none';
    watermark.style.opacity = options.opacity.toString();
    watermark.style.color = 'white';
    watermark.style.textShadow = '0px 1px 2px rgba(0,0,0,0.8)';
    watermark.style.fontSize = `${density.fontSize}px`;
    watermark.style.fontFamily = 'sans-serif';
    watermark.style.transform = 'rotate(-30deg)';
    watermark.style.overflow = 'hidden';
    watermark.style.zIndex = '1000';
    
    return watermark;
  }
  
  /**
   * Détermine la configuration de densité du filigrane
   */
  private getDensityConfig(density: 'low' | 'medium' | 'high') {
    switch (density) {
      case 'low':
        return { rows: 3, cols: 3, fontSize: 12 };
      case 'high':
        return { rows: 8, cols: 8, fontSize: 10 };
      case 'medium':
      default:
        return { rows: 5, cols: 5, fontSize: 11 };
    }
  }
  
  /**
   * Fait tourner le filigrane à intervalles réguliers pour contrer les outils d'édition
   */
  private rotateWatermark(watermark: HTMLDivElement): void {
    let angle = -30;
    setInterval(() => {
      angle = (angle + 5) % 360;
      watermark.style.transform = `rotate(${angle}deg)`;
    }, 10000); // Rotation toutes les 10 secondes
  }
  
  /**
   * Configure la détection de capture d'écran
   */
  private setupScreenCaptureDetection(): void {
    // Détection via l'API visibilitychange (non standard mais utile)
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Détection via les raccourcis clavier
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Protection contre la sélection de contenu
    document.addEventListener('selectstart', this.handleSelection);
    
    // Notification dans la console pour aider au débogage
    console.log('[Triple Shield™] Détection de capture d'écran activée');
  }
  
  /**
   * Gère les changements de visibilité de la page (peut indiquer une capture d'écran)
   */
  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      // Simuler une détection de capture d'écran
      setTimeout(() => {
        if (document.visibilityState === 'hidden') {
          this.handleScreenCaptureDetected();
        }
      }, 300);
    }
  };
  
  /**
   * Gère les événements clavier pour détecter les captures d'écran
   */
  private handleKeyDown = (e: KeyboardEvent): void => {
    // Détection de Print Screen ou autres raccourcis de capture d'écran
    if (
      (e.key === 'PrintScreen') || 
      (e.ctrlKey && e.key === 'c') ||
      (e.metaKey && e.key === 'c') ||
      (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) ||
      (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'I'))
    ) {
      this.handleScreenCaptureDetected();
      if (this.options.screenCaptureOptions.enablePrevention) {
        e.preventDefault();
      }
    }
  };
  
  /**
   * Gère les événements de sélection de texte
   */
  private handleSelection = (e: Event): void => {
    if (this.options.screenCaptureOptions.enablePrevention) {
      e.preventDefault();
    }
  };
  
  /**
   * Gère une détection de capture d'écran
   */
  private handleScreenCaptureDetected(): void {
    console.log('[Triple Shield™] Capture d\'écran détectée');
    
    // Rendre tous les filigranes visibles
    this.watermarkInstances.forEach(watermark => {
      const originalOpacity = watermark.style.opacity;
      watermark.style.opacity = '0.8';
      watermark.style.fontSize = '16px';
      watermark.style.fontWeight = 'bold';
      
      // Revenir à l'état normal après quelques secondes
      setTimeout(() => {
        watermark.style.opacity = originalOpacity;
        watermark.style.fontSize = '11px';
        watermark.style.fontWeight = 'normal';
      }, 3000);
    });
    
    // Notifier l'utilisateur si configuré
    if (this.options.screenCaptureOptions.alertUser) {
      this.showCaptureAlert();
    }
    
    // Notifier le créateur si configuré
    if (this.options.screenCaptureOptions.alertCreator) {
      this.logCaptureForCreator();
    }
  }
  
  /**
   * Affiche une alerte à l'utilisateur concernant la capture d'écran
   */
  private showCaptureAlert(): void {
    // Cette fonction peut être remplacée par une intégration avec le système de toast
    const alertElement = document.createElement('div');
    alertElement.innerText = 'Capture d\'écran détectée. Ce contenu est protégé.';
    alertElement.style.position = 'fixed';
    alertElement.style.top = '20px';
    alertElement.style.left = '50%';
    alertElement.style.transform = 'translateX(-50%)';
    alertElement.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    alertElement.style.color = 'white';
    alertElement.style.padding = '10px 20px';
    alertElement.style.borderRadius = '5px';
    alertElement.style.zIndex = '10000';
    
    document.body.appendChild(alertElement);
    
    setTimeout(() => {
      document.body.removeChild(alertElement);
    }, 3000);
  }
  
  /**
   * Enregistre la tentative de capture pour le créateur
   */
  private logCaptureForCreator(): void {
    if (!this.contentId || !this.creatorId) return;
    
    const captureData = {
      contentId: this.contentId,
      creatorId: this.creatorId,
      userId: this.userId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    
    // Cette partie peut être intégrée avec une API pour enregistrer l'événement
    console.log('[Triple Shield™] Tentative de capture enregistrée:', captureData);
    // TODO: Implémenter l'envoi à l'API
  }
  
  /**
   * Nettoie les ressources utilisées par le service
   */
  public destroy(): void {
    // Supprimer les filigranes
    this.watermarkInstances.forEach(watermark => {
      if (watermark.parentElement) {
        watermark.parentElement.removeChild(watermark);
      }
    });
    
    // Supprimer les écouteurs d'événements
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('selectstart', this.handleSelection);
    
    // Arrêter les intervalles
    if (this.snapshotInterval !== null) {
      window.clearInterval(this.snapshotInterval);
    }
    
    console.log('[Triple Shield™] Protection désactivée');
  }
}

// Exporter une instance singleton du service
export const contentProtection = new ContentProtectionService();
export default contentProtection;
