
import React from 'react';

interface VideoSchemaProps {
  url: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
}

export const VideoSchema: React.FC<VideoSchemaProps> = ({
  url,
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl: contentUrl || url,
    embedUrl: embedUrl || url,
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface WebsiteSchemaProps {
  name: string;
  url: string;
  description: string;
  logoUrl: string;
}

export const WebsiteSchema: React.FC<WebsiteSchemaProps> = ({
  name,
  url,
  description,
  logoUrl
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    publisher: {
      '@type': 'Organization',
      name,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl
      }
    }
  };

  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface SEOSchemaProps {
  pageType: 'home' | 'video' | 'category' | 'performer';
  data?: any;
}

const SEOSchema: React.FC<SEOSchemaProps> = ({ pageType, data }) => {
  // Configuration de base du site
  const baseSchema = (
    <WebsiteSchema
      name="Xvush"
      url="https://xvush.com"
      description="Une plateforme de contenu premium avec une interface élégante et intuitive."
      logoUrl="https://xvush.com/logo.png"
    />
  );

  // En fonction du type de page, ajouter des schémas supplémentaires
  if (pageType === 'video' && data) {
    return (
      <>
        {baseSchema}
        <VideoSchema
          url={data.url}
          name={data.title}
          description={data.description || `Vidéo par ${data.performer}`}
          thumbnailUrl={data.thumbnail}
          uploadDate={data.uploadDate || new Date().toISOString()}
          duration={data.duration}
          contentUrl={data.contentUrl}
          embedUrl={data.embedUrl}
        />
      </>
    );
  }

  return baseSchema;
};

export default SEOSchema;
