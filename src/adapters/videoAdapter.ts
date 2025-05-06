
import { SupabaseVideo } from "@/services/supabaseVideoService";
import { getCreatorProfileUrl } from "@/utils/creaverseLinks";

/**
 * Adapte une vidéo Supabase pour être utilisée avec XTeaseVideoCard
 */
export const adaptSupabaseVideoToXTeaseFormat = (video: SupabaseVideo) => {
  return {
    id: video.id,
    title: video.title || "Vidéo sans titre",
    performer: `Creator ${video.creatorId || 1}`,
    views: `${Math.floor(Math.random() * 100) + 10}K vues`,
    thumbnail: video.thumbnail_url || "",
    streamUrl: video.video_url || video.videoUrl || "",
    isPremium: video.is_premium === true,
    isPreview: video.is_premium === true && video.type === 'teaser',
    creatorProfileUrl: getCreatorProfileUrl(video.creatorId || 1)
  };
};

/**
 * Adapte une vidéo Supabase pour être utilisée avec VideoCard
 */
export const adaptSupabaseVideoToVideoCard = (video: SupabaseVideo) => {
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
