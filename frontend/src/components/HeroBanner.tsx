import { Flame, Info, Play, Star, Volume2, VolumeX } from 'lucide-react';
import React, { useState, useEffect } from 'react';
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
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Disable browser OS media session overlay and reset video ready state
  useEffect(() => {
    setIsVideoReady(false);
    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('nexttrack', null);
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
      } catch (e) {
        // Ignore browser restriction errors
      }
    }
  }, [movie?.id]);

  if (!movie) {
    return (
      <div className="skeleton hero-skeleton" />
    );
  }

  // Convert trailerUrl into background video embed link with autoplay & loop
  const getHeroEmbedUrl = (url: string, muted: boolean) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    const videoId = match ? match[1] : null;
    if (!videoId) return url;
    const muteParam = muted ? '1' : '0';
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muteParam}&controls=0&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0&cc_load_policy=0&autohide=1`;
  };

  const isDirectVideo = movie.trailerUrl?.endsWith('.mp4') || movie.trailerUrl?.endsWith('.webm');
  const embedUrl = getHeroEmbedUrl(movie.trailerUrl, isMuted);

  return (
    <div
      className="hero-wrapper"
      style={{ backgroundImage: `url(${movie.bannerUrl || movie.posterUrl})` }}
    >
      {/* Background Video Streaming Element */}
      {movie.trailerUrl && (
        <div className="hero-video-wrapper">
          {isDirectVideo ? (
           <video
            key={movie.id}
            src={movie.trailerUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            onCanPlay={() => setIsVideoReady(true)}
            onPlay={() => setIsVideoReady(true)}
            className={`hero-video-element ${isVideoReady ? 'loaded' : 'loading'}`}
           />
          ) : (
            <iframe
              key={movie.id}
              src={embedUrl}
              title={movie.title}
              onLoad={() => setIsVideoReady(true)}
              className={`hero-video-iframe ${isVideoReady ? 'loaded' : 'loading'}`}
              allow="autoplay; encrypted-media"
            />
          )}
        </div>
      )}

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

