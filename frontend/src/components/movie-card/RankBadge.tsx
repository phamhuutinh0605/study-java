import React from 'react';

interface RankBadgeProps {
  rankNumber?: number;
}

export const RankBadge: React.FC<RankBadgeProps> = ({ rankNumber }) => {
  if (rankNumber === undefined) return null;

  return <div className="rank-number">{rankNumber}</div>;
};
