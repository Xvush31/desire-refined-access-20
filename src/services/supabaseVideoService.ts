
import { supabase } from "@/integrations/supabase/client";

export interface SupabaseVideo {
  id: number;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  videoUrl: string | null; // Pour la rétrocompatibilité
  format: string | null;
  type: string | null;
  is_premium: boolean | null;
  isFree: boolean | null;
  uploadedat: string | null;
  user_id: string | null;
  creatorId: number | null;
}

/**
 * Récupère les vidéos standards et teaser (vidéos gratuites)
 */
export const getPromotionalVideos = async (): Promise<{
  data: SupabaseVideo[] | null;
  error: any;
}> => {
  console.log("Fetching promotional videos from Supabase");
  const response = await supabase
    .from('videos')
    .select('*')
    .in('type', ['standard', 'teaser'])
    .order('uploadedat', { ascending: false });
  
  console.log("Promotional videos response:", response);
  
  if (response.data && response.data.length > 0) {
    // Verify video URLs
    const videosWithValidUrls = response.data.map(video => {
      if (!video.video_url && !video.videoUrl) {
        console.warn(`Video ${video.id} has no URL`);
      } else {
        console.log(`Video ${video.id} URL: ${video.video_url || video.videoUrl}`);
      }
      return video;
    });
    
    // Log some sample data
    console.log("Sample promotional video data:", JSON.stringify(response.data[0], null, 2));
    
    // Update the response data with our verified videos
    response.data = videosWithValidUrls;
  }
  
  return response;
};

/**
 * Récupère spécifiquement les vidéos Xtease (format vertical 9:16)
 */
export const getXteaseVideos = async (): Promise<{
  data: SupabaseVideo[] | null;
  error: any;
}> => {
  console.log("Fetching XTease videos from Supabase");
  const response = await supabase
    .from('videos')
    .select('*')
    .eq('format', '9:16')
    .order('uploadedat', { ascending: false });
  
  console.log("XTease videos response:", response);
  
  if (response.data && response.data.length > 0) {
    // Verify video URLs
    const videosWithValidUrls = response.data.map(video => {
      if (!video.video_url && !video.videoUrl) {
        console.warn(`XTease video ${video.id} has no URL`);
      } else {
        console.log(`XTease video ${video.id} URL: ${video.video_url || video.videoUrl}`);
      }
      return video;
    });
    
    // Log some sample data
    console.log("Sample XTease video data:", JSON.stringify(response.data[0], null, 2));
    
    // Update the response data with our verified videos
    response.data = videosWithValidUrls;
  }
  
  return response;
};

/**
 * Récupère uniquement les vidéos standards (gratuites)
 */
export const getStandardVideos = async (): Promise<{
  data: SupabaseVideo[] | null;
  error: any;
}> => {
  return supabase
    .from('videos')
    .select('*')
    .eq('type', 'standard')
    .eq('is_premium', false)
    .order('uploadedat', { ascending: false });
};

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
    console.error("Invalid video URL:", url);
    return "";
  }
};

/**
 * Convertit une vidéo Supabase au format utilisé par le composant CreatorFeedPost
 */
export const supabaseVideoToFeedPost = (video: SupabaseVideo): any => {
  // Vérifier que la vidéo est définie
  if (!video) {
    console.error("Video object is undefined in supabaseVideoToFeedPost");
    return null;
  }
  
  // S'assurer que streamUrl est toujours défini et valide
  const rawStreamUrl = video.video_url || video.videoUrl || '';
  const streamUrl = normalizeVideoUrl(rawStreamUrl);
  
  // Log pour débogage
  console.log(`Converting video ${video.id} to feed post format`);
  console.log(`Stream URL for feed: ${streamUrl}`);
  console.log(`Is HLS: ${streamUrl.includes('.m3u8') || streamUrl.includes('playlist')}`);
  
  // Vérification supplémentaire pour s'assurer que l'URL est valide
  if (!streamUrl) {
    console.warn(`Video ${video.id} has no valid stream URL`);
  }
  
  return {
    id: `video-${video.id}`,
    image: video.thumbnail_url || 'https://picsum.photos/600/1067',
    caption: video.title || 'Vidéo sans titre',
    creatorId: video.creatorId || 1,
    creatorName: 'XDose Creator',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&w=256&h=256&q=80',
    likes: Math.floor(Math.random() * 1000) + 100,
    timestamp: 'il y a quelques heures',
    isPremium: video.is_premium === true,
    videoUrl: streamUrl,
    format: video.format || 'standard',
    isVideo: Boolean(streamUrl && streamUrl.length > 0), // S'assurer que isVideo n'est true que si streamUrl est valide
    isHLS: streamUrl.includes('.m3u8') || streamUrl.includes('playlist'), // Indicating if this is HLS format
    uniqueId: `video-${video.id}-${Date.now().toString(36)}` // Add unique ID to prevent key conflicts
  };
};
