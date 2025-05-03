
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CreatorProfileInfoProps {
  name: string;
  verified?: boolean;
  followers?: number;
  description?: string;
}

const CreatorProfileInfo: React.FC<CreatorProfileInfoProps> = ({
  name,
  verified = false,
  followers = 0,
  description
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        {verified && (
          <Badge variant="secondary" className="px-2 py-0">Vérifié</Badge>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <span>{followers.toLocaleString()} followers</span>
      </div>
      
      {description && (
        <p className="text-sm">{description}</p>
      )}
    </div>
  );
};

export default CreatorProfileInfo;
