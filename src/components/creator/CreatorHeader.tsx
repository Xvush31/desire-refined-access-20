
import React from 'react';
import { Button } from '@/components/ui/button';
import CreatorProfileAvatar from './CreatorProfileAvatar';
import CreatorProfileInfo from './CreatorProfileInfo';

interface CreatorHeaderProps {
  name: string;
  imageUrl?: string;
  verified?: boolean;
  followers?: number;
  description?: string;
  onFollow?: () => void;
  isFollowing?: boolean;
}

const CreatorHeader: React.FC<CreatorHeaderProps> = ({
  name,
  imageUrl,
  verified = false,
  followers = 0,
  description,
  onFollow,
  isFollowing = false
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border-b">
      <CreatorProfileAvatar 
        imageUrl={imageUrl}
        name={name}
        size="xl"
      />
      
      <div className="flex-1 text-center sm:text-left">
        <CreatorProfileInfo
          name={name}
          verified={verified}
          followers={followers}
          description={description}
        />
        
        <div className="mt-4">
          <Button 
            variant={isFollowing ? "outline" : "default"}
            onClick={onFollow}
          >
            {isFollowing ? 'Suivi' : 'Suivre'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatorHeader;
