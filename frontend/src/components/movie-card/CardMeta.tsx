import React from 'react';
import { Star } from 'lucide-react';

interface CardMetaProps {
  title: string;
  matchPercentage: number;
  ageRating: string;
  duration: string;
  rating: number;
  categoryName?: string;
}

export const CardMeta: React.FC<CardMetaProps> = ({
  title,
  matchPercentage,
  ageRating,
  duration,
  rating,
  categoryName,
}) => {
  return (
    <>
      {/* Title */}
      <h3 className="card-title-text">
        {title}
      </h3>

      {/* Meta Info Row */}
      <div className="card-meta-row">
        <div className="card-meta-group">
          <span className="card-match-pct">
            {matchPercentage}%
          </span>
          <span className="card-age-pill">
            {ageRating}
          </span>
          <span className="card-duration-text">{duration}</span>
        </div>

        <div className="card-star-rating">
          <Star size={12} fill="#FFD700" />
          <span className="card-star-score">{rating}</span>
        </div>
      </div>

      {/* Category Tag */}
      {categoryName && (
        <div className="card-category-tag">
          &bull; {categoryName}
        </div>
      )}
    </>
  );
};
