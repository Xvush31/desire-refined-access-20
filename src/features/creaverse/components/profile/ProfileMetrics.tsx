
import React from 'react';

interface MetricsData {
  followers: number;
  following?: number;
  retentionRate?: number;
  superfans?: number;
  watchMinutes?: number;
}

interface ProfileMetricsProps {
  metrics: MetricsData;
}

const ProfileMetrics: React.FC<ProfileMetricsProps> = ({ metrics }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2">
      <div>
        <span className="font-semibold">{formatNumber(metrics.followers)}</span>
        <span className="text-muted-foreground text-sm ml-1">followers</span>
      </div>
      {metrics.following !== undefined && (
        <div>
          <span className="font-semibold">{formatNumber(metrics.following)}</span>
          <span className="text-muted-foreground text-sm ml-1">following</span>
        </div>
      )}
      {metrics.retentionRate !== undefined && (
        <div>
          <span className="font-semibold">{metrics.retentionRate}%</span>
          <span className="text-muted-foreground text-sm ml-1">retention</span>
        </div>
      )}
      {metrics.superfans !== undefined && (
        <div>
          <span className="font-semibold">{formatNumber(metrics.superfans)}</span>
          <span className="text-muted-foreground text-sm ml-1">super-fans</span>
        </div>
      )}
      {metrics.watchMinutes !== undefined && (
        <div>
          <span className="font-semibold">{metrics.watchMinutes}</span>
          <span className="text-muted-foreground text-sm ml-1">watch minutes</span>
        </div>
      )}
    </div>
  );
};

export default ProfileMetrics;
