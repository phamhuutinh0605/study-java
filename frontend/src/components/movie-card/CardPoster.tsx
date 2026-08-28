import React from 'react';

interface CardPosterProps {
  posterUrl: string;
  title: string;
  qualityTag?: string;
}

export const CardPoster: React.FC<CardPosterProps> = ({
  posterUrl,
  title,
  qualityTag = '4K HDR',
}) => {
  return (
    <div className="card-poster-wrapper">
      <img
        src={posterUrl}
        alt={title}
        className="card-poster-img"
        loading="lazy"
      />

      {qualityTag && (
        <div className="card-quality-tag">
          {qualityTag}
        </div>
      )}
    </div>
  );
};
