import React, { useState } from 'react';
import { Play, Info, Star, Volume2, VolumeX, Flame } from 'lucide-react';
import type { Movie } from '../types/movie';
import { AppIcon } from './AppIcon';

interface HeroBannerProps {
  movie: Movie | null;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  movie,
  onPlay,
  onMoreInfo,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  if (!movie) {
    return (
      <div className="skeleton hero-skeleton" />
    );
  }

  return (
    <div
      className="hero-wrapper"
      style={{ backgroundImage: `url(${movie.bannerUrl || movie.posterUrl})` }}
    >
      {/* Dark Overlay Gradient */}
      <div className="hero-gradient hero-overlay-absolute" />

      {/* Hero Banner Content */}
      <div className="hero-content-inner animate-fade-in">
        {/* Netflix Series / Top 10 Badge */}
        <div className="hero-badge-group">
          <span className="netflix-badge">N FILM</span>
          <div className="hero-top-badge">
            <AppIcon icon={Flame} variant="orange" fill="#FB923C" size="xs" iconClassName="animate-pulse" text="#1 IN MOVIES TODAY" />
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title">
          {movie.title}
        </h1>

        {/* Meta Info Badges */}
        <div className="hero-meta-row">
          <span className="text-match">
            {movie.matchPercentage}% Match
          </span>
          <span className="spec-pill">{movie.ageRating}</span>
          <span className="spec-pill">{movie.releaseYear}</span>
          <span className="spec-pill">{movie.duration}</span>
          <span className="spec-pill blue">4K Ultra HD</span>
          <span className="spec-pill purple">Dolby Atmos</span>

          <div className="hero-star-box flex items-center gap-1">
            <Star size={16} fill="#FFD700" color="#FFD700" />
            <span className="hero-star-score">{movie.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="hero-description">
          {movie.description}
        </p>

        {/* Action Buttons */}
        <div className="hero-actions-row">
          <button onClick={() => onPlay(movie)} className="hero-btn-primary">
            <Play size={22} fill="#000" /> Watch Trailer
          </button>

          <button onClick={() => onMoreInfo(movie)} className="hero-btn-secondary">
            <Info size={22} /> More Info
          </button>
        </div>
      </div>

      {/* Sound Toggle Button (Bottom Right) */}
      <div className="hero-bottom-controls">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="hero-sound-btn"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <span className="hero-age-tag">
          {movie.ageRating}
        </span>
      </div>
    </div>
  );
};

