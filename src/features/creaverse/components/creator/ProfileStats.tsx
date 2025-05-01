
import React from "react";

interface ProfileStatsProps {
  followerCount?: number;
  followingCount?: number;
  contentCount?: number;
  viewCount?: number;
  tier?: string;
  stats?: {
    followers: number;
    following: number;
    contentCount: number;
    views: number;
  };
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  followerCount,
  followingCount,
  contentCount,
  viewCount,
  tier,
  stats
}) => {
  // Use either direct props or stats object
  const followers = followerCount || (stats?.followers || 0);
  const following = followingCount || (stats?.following || 0);
  const content = contentCount || (stats?.contentCount || 0);
  const views = viewCount || (stats?.views || 0);

  return (
    <div className="flex flex-wrap gap-6 justify-between mt-4 pt-4 border-t border-border">
      <div className="text-center">
        <div className="text-lg font-semibold">{followers.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Abonnés</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold">{following.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Abonnements</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold">{content.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Publications</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-semibold">{views.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Vues</div>
      </div>
      {tier && (
        <div className="text-center">
          <div className="text-lg font-semibold animated-gradient">{tier}</div>
          <div className="text-xs text-muted-foreground">Niveau</div>
        </div>
      )}
    </div>
  );
};

export default ProfileStats;
