
/**
 * Utility functions to handle CreaVerse links redirection
 */

export const CREAVERSE_DOMAIN = "https://www.creaverse.xvush.com";
export const XDOSE_DOMAIN = "https://www.xdose.xvush.com";

/**
 * Converts an internal CreaVerse path to an external URL
 * @param path The path to append to the CreaVerse domain
 * @returns The full external URL
 */
export const getCreaVerseUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return `${CREAVERSE_DOMAIN}/${cleanPath}`;
};

/**
 * Creates a URL for a creator profile using the exact required format
 * @param creatorId The ID of the creator
 * @returns The URL for the creator profile using the exact format
 */
export const getCreatorProfileUrl = (creatorId: number | string): string => {
  // Return the exact xdose.xvush.com URL without any parameters
  return XDOSE_DOMAIN;
};

/**
 * Determines if a path is a CreaVerse path
 * @param path The path to check
 * @returns True if the path is a CreaVerse path
 */
export const isCreaVersePath = (path: string): boolean => {
  return path.startsWith('/creaverse') || path.startsWith('/creaverse-app');
};

/**
 * Open a CreaVerse URL in a new tab
 * @param path The path to open
 */
export const openCreaVerseInNewTab = (path: string): void => {
  window.open(getCreaVerseUrl(path), '_blank');
};
