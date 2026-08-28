import React, { useState } from 'react';
import { X, Play, Plus, Check, Star, ThumbsUp, Share2, Heart, Info, Film } from 'lucide-react';
import type { Movie } from '../types/movie';
import { AppIcon } from './AppIcon';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  isInMyList: boolean;
  onToggleMyList: (movie: Movie) => void;
  initialPlayTrailer?: boolean;
  allMovies?: Movie[];
  onSelectMovie?: (movie: Movie) => void;
  onShowToast?: (text: string) => void;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  isInMyList,
  onToggleMyList,
  initialPlayTrailer = false,
  allMovies = [],
  onSelectMovie,
  onShowToast,
}) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(initialPlayTrailer);
  const [activeTab, setActiveTab] = useState<'overview' | 'similar' | 'trailers'>('overview');
  const [userRating, setUserRating] = useState<'liked' | 'disliked' | 'loved' | null>(null);

  if (!movie) return null;

  // Smart Youtube Embed URL helper
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return `${url}?autoplay=1&rel=0`;
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
    }
    return url;
  };

  const similarMovies = allMovies
    .filter((m) => m.id !== movie.id && (m.category?.slug === movie.category?.slug || m.rating >= 8.5))
    .slice(0, 6);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    if (onShowToast) {
      onShowToast(`Movie link for "${movie.title}" copied to clipboard!`);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-box animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-round"
        >
          <X size={20} />
        </button>

        {/* Media Header */}
        <div className="modal-header-banner">
          {isPlayingVideo && movie.trailerUrl ? (
            <iframe
              src={getEmbedUrl(movie.trailerUrl)}
              title={movie.title}
              className="modal-media-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={movie.bannerUrl || movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="modal-gradient-bottom" />
              <div className="modal-banner-actions">
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="hero-btn-primary btn-surprise-action-play"
                >
                  <Play size={20} fill="#000" /> Watch Trailer
                </button>

                <button
                  onClick={() => {
                    onToggleMyList(movie);
                    if (onShowToast) {
                      onShowToast(isInMyList ? `Removed "${movie.title}" from My List` : `Added "${movie.title}" to My List!`);
                    }
                  }}
                  className={`modal-action-btn-circle ${isInMyList ? 'active' : ''}`}
                  title={isInMyList ? 'Remove from My List' : 'Add to My List'}
                >
                  {isInMyList ? <Check size={20} /> : <Plus size={20} />}
                </button>

                {/* Rating Feedback Buttons */}
                <button
                  onClick={() => setUserRating(userRating === 'liked' ? null : 'liked')}
                  className={`modal-action-btn-circle ${userRating === 'liked' ? 'liked' : ''}`}
                  title="I like this"
                >
                  <ThumbsUp size={18} />
                </button>

                <button
                  onClick={() => setUserRating(userRating === 'loved' ? null : 'loved')}
                  className={`modal-action-btn-circle ${userRating === 'loved' ? 'loved' : ''}`}
                  title="Love this!"
                >
                  <Heart size={18} fill={userRating === 'loved' ? 'var(--netflix-red)' : 'none'} />
                </button>

                <button
                  onClick={handleShare}
                  className="modal-action-btn-circle"
                  title="Share Movie Link"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tab-bar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          >
            <AppIcon icon={Info} variant="blue" size="xs" text="Overview" />
          </button>
          <button
            onClick={() => setActiveTab('similar')}
            className={`modal-tab-btn ${activeTab === 'similar' ? 'active' : ''}`}
          >
            <AppIcon icon={Film} variant="purple" size="xs" text={`More Like This (${similarMovies.length})`} />
          </button>
        </div>

        {/* Tab Contents */}
        <div className="modal-tab-container">
          {activeTab === 'overview' && (
            <div className="modal-overview-grid">
              <div>
                <h2 className="modal-movie-title">
                  {movie.title}
                </h2>

                {/* Metadata badges */}
                <div className="modal-meta-bar">
                  <span className="text-match">
                    {movie.matchPercentage}% Match
                  </span>
                  <span className="spec-pill">{movie.ageRating}</span>
                  <span className="spec-pill">{movie.releaseYear}</span>
                  <span className="spec-pill">{movie.duration}</span>
                  <span className="spec-pill blue">4K Ultra HD</span>

                  <div className="card-star-rating">
                    <Star size={16} fill="#FFD700" />
                    <span className="hero-star-score">{movie.rating}</span>
                  </div>
                </div>

                <p className="modal-overview-text">
                  {movie.description}
                </p>
              </div>

              {/* Specs Sidebar */}
              <div className="modal-sidebar-box">
                <div>
                  <div className="modal-sidebar-label">Genre & Category</div>
                  <div className="modal-sidebar-val">{movie.category?.name || 'N/A'}</div>
                </div>

                <div>
                  <div className="modal-sidebar-label">Maturity Rating</div>
                  <div className="modal-sidebar-val">{movie.ageRating} &bull; Recommended for audiences</div>
                </div>

                <div>
                  <div className="modal-sidebar-label">Audio & Subtitles</div>
                  <div className="modal-sidebar-val">English [Original], Vietnamese, Spanish (Dolby 5.1)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'similar' && (
            <div>
              <h3 className="modal-similar-title">
                Titles Similar to "{movie.title}"
              </h3>

              <div className="modal-similar-grid">
                {similarMovies.map((simMovie) => (
                  <div
                    key={simMovie.id}
                    onClick={() => {
                      if (onSelectMovie) onSelectMovie(simMovie);
                    }}
                    className="modal-similar-card"
                  >
                    <img
                      src={simMovie.posterUrl}
                      alt={simMovie.title}
                      className="w-full object-cover modal-similar-img"
                    />
                    <div className="modal-similar-body">
                      <h4 className="card-title-text">
                        {simMovie.title}
                      </h4>
                      <span className="text-match">
                        {simMovie.matchPercentage}% Match
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

