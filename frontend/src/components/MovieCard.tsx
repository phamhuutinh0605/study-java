import React from 'react';
import type { Movie } from '../types/movie';
import { RankBadge } from './movie-card/RankBadge';
import { CardPoster } from './movie-card/CardPoster';
import { CardActions } from './movie-card/CardActions';
import { CardMeta } from './movie-card/CardMeta';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
  isInMyList: boolean;
  onToggleMyList: (movie: Movie) => void;
  rankNumber?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onSelect,
  onPlay,
  isInMyList,
  onToggleMyList,
  rankNumber,
}) => {
  return (
    <div className="movie-card-container">
      {/* Top 10 Rank Badge Sub-component */}
      <RankBadge rankNumber={rankNumber} />

      {/* Main Card Container */}
      <div
        className={`movie-card movie-card-inner ${rankNumber !== undefined ? 'ranked' : 'standard'}`}
        onClick={() => onSelect(movie)}
      >
        {/* Poster Image Sub-component */}
        <CardPoster posterUrl={movie.posterUrl} title={movie.title} qualityTag="4K HDR" />

        {/* Info Content */}
        <div className="movie-card-body">
          {/* Action Buttons Sub-component */}
          <CardActions
            onPlay={(e) => {
              e.stopPropagation();
              onPlay(movie);
            }}
            onToggleMyList={(e) => {
              e.stopPropagation();
              onToggleMyList(movie);
            }}
            onSelect={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
            isInMyList={isInMyList}
          />

          {/* Metadata Sub-component */}
          <CardMeta
            title={movie.title}
            matchPercentage={movie.matchPercentage}
            ageRating={movie.ageRating}
            duration={movie.duration}
            rating={movie.rating}
            categoryName={movie.category?.name}
          />
        </div>
      </div>
    </div>
  );
};


