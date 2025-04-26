import axios from "axios";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  categories: string[];
  url: string;
  views: number;
  duration: string;
}

export const fetchVideos = async (
  query: string,
  page: number = 1
): Promise<Video[]> => {
  try {
    const response = await axios.get(
      "https://api.eporner.com/v2/videos/search",
      {
        params: {
          query: query || "popular",
          per_page: 10,
          page,
          thumbsize: "big",
        },
      }
    );

    const videos = response.data.videos.map((video: any) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      categories: video.categories,
      url: video.url,
      views: video.views,
      duration: video.duration,
    }));

    return videos;
  } catch (error) {
    console.error("Erreur lors du scraping des vidéos:", error);
    return [];
  }
};

