
import { SupabaseVideo } from "@/services/supabaseVideoService";
import { getCreatorProfileUrl } from "@/utils/creaverseLinks";

/**
 * Normalize a video URL to ensure it's valid
 */
const normalizeVideoUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  
  // Check if the URL is valid
  try {
    // This will throw if URL is invalid
    new URL(url);
    return url;
  } catch (e) {
    console.error("Invalid video URL:", url, e);
    return "";
  }
};

/**
 * Determine if a video URL is likely an HLS stream
 */
const isHLSStream = (url: string): boolean => {
  return url.includes('.m3u8') || url.includes('playlist');
};

/**
 * Adapte une vidéo Supabase pour être utilisée avec XTeaseVideoCard
 */
export const adaptSupabaseVideoToXTeaseFormat = (video: SupabaseVideo) => {
  // Vérifier que video n'est pas undefined avant d'essayer d'accéder à ses propriétés
  if (!video) {
    console.error("Video object is undefined in adaptSupabaseVideoToXTeaseFormat");
    return {
      id: 0,
      title: "Vidéo non disponible",
      performer: "Creator",
      views: "0 vues",
      thumbnail: "",
      streamUrl: "",
      isPremium: false,
      isPreview: false,
      creatorProfileUrl: ""
    };
  }

  // S'assurer que streamUrl est toujours défini et valide
  const rawStreamUrl = video.video_url || video.videoUrl || "";
  const streamUrl = normalizeVideoUrl(rawStreamUrl);
  
  // Journaliser l'URL du stream pour débogage
  console.log("Adapting video with ID:", video.id);
  console.log("Stream URL:", streamUrl);
  console.log("Is HLS stream:", isHLSStream(streamUrl));

  // Vérification supplémentaire pour s'assurer que l'URL est valide
  if (!streamUrl) {
    console.warn(`XTease video ${video.id} has no valid stream URL`);
  }

  return {
    id: video.id,
    title: video.title || "Vidéo sans titre",
    performer: `Creator ${video.creatorId || 1}`,
    views: `${Math.floor(Math.random() * 100) + 10}K vues`,
    thumbnail: video.thumbnail_url || "",
    streamUrl: streamUrl,
    isPremium: video.is_premium === true,
    isPreview: video.is_premium === true && video.type === 'teaser',
    creatorProfileUrl: getCreatorProfileUrl(video.creatorId || 1),
    isHLS: isHLSStream(streamUrl)
  };
};

/**
 * Adapte une vidéo Supabase pour être utilisée avec VideoCard
 */
export const adaptSupabaseVideoToVideoCard = (video: SupabaseVideo) => {
  // Vérifier que video n'est pas undefined avant d'essayer d'accéder à ses propriétés
  if (!video) {
    console.error("Video object is undefined in adaptSupabaseVideoToVideoCard");
    return {
      id: 0,
      title: "Vidéo non disponible",
      thumbnail: "",
      duration: "00:00",
      views: "0 vues",
      performer: "Creator",
      isPremium: false,
      navigateTo: "/videos"
    };
  }

  return {
    id: video.id,
    title: video.title || "Vidéo sans titre",
    thumbnail: video.thumbnail_url || "",
    duration: "00:00", // Par défaut, à remplacer si disponible
    views: `${Math.floor(Math.random() * 100) + 10}K vues`,
    performer: `Creator ${video.creatorId || 1}`,
    isPremium: video.is_premium === true,
    navigateTo: video.format === '9:16' 
      ? `/xtease?videoId=${video.id}` 
      : `/video/${video.id}`
  };
};
