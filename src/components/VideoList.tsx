import React, { useState, useEffect } from "react";
import { fetchVideos } from "../services/videoService";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  categories: string[];
  url: string;
  views: number;
  duration: string;
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      const fetchedVideos = await fetchVideos("popular", 1);
      setVideos(fetchedVideos);
      setLoading(false);

      const allCategories = new Set<string>();
      fetchedVideos.forEach((video) =>
        video.categories.forEach((category) => allCategories.add(category))
      );
      setCategories(Array.from(allCategories));
    };

    loadVideos();
  }, []);

  if (loading) {
    return <div>Chargement des vidéos...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Vidéos Populaires</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Catégories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-3 py-1 bg-brand-red text-white rounded"
              onClick={() => {
                const filteredVideos = videos.filter((video) =>
                  video.categories.includes(category)
                );
                setVideos(filteredVideos);
              }}
            >
              {category}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-500 text-white rounded"
            onClick={async () => {
              setLoading(true);
              const fetchedVideos = await fetchVideos("popular", 1);
              setVideos(fetchedVideos);
              setLoading(false);
            }}
          >
            Réinitialiser
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="border rounded overflow-hidden shadow">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600">Durée: {video.duration}</p>
                <p className="text-sm text-gray-600">Vues: {video.views}</p>
                <p className="text-sm text-gray-600">
                  Catégories: {video.categories.join(", ")}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
