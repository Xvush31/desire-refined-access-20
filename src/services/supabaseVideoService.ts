
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
    // Log quelques exemples de vidéos pour vérifier les champs
    console.log("Sample promotional video data:", JSON.stringify(response.data[0], null, 2));
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
    // Log quelques exemples de vidéos pour vérifier les champs
    console.log("Sample XTease video data:", JSON.stringify(response.data[0], null, 2));
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
 * Convertit une vidéo Supabase au format utilisé par le composant CreatorFeedPost
 */
export const supabaseVideoToFeedPost = (video: SupabaseVideo): any => {
  // Vérifier que la vidéo est définie
  if (!video) {
    console.error("Video object is undefined in supabaseVideoToFeedPost");
    return null;
  }
  
  // S'assurer que streamUrl est toujours défini en priorisant video_url, puis videoUrl
  const streamUrl = video.video_url || video.videoUrl || '';
  
  // Log pour débogage
  console.log(`Converting video ${video.id} to feed post format`);
  console.log(`Stream URL for feed: ${streamUrl}`);
  
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
    videoUrl: streamUrl, // Utiliser la variable streamUrl créée ci-dessus
    format: video.format || 'standard',
    isVideo: Boolean(streamUrl) // Seulement true si streamUrl n'est pas vide
  };
};
