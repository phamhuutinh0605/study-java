import React, { useState } from 'react';
import { Dices, Play, Info, X, Sparkles } from 'lucide-react';
import type { Movie } from '../types/movie';
import { AppIcon } from './AppIcon';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({
  isOpen,
  onClose,
  movies,
  onSelectMovie,
  onPlayMovie,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePickRandom = () => {
    if (!movies || movies.length === 0) return;
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * movies.length);
      setSelectedMovie(movies[randomIdx]);
      count++;
      if (count > 12) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="modal-overlay surprise-overlay" onClick={onClose}>
      <div
        className="modal-content-box surprise-modal-content animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="toast-close-btn surprise-close-btn"
        >
          <X size={18} />
        </button>

        <div className="surprise-icon-wrapper flex items-center justify-center mb-2">
          <AppIcon
            icon={Dices}
            variant="red"
            size="xl"
            iconClassName={isSpinning ? 'animate-spin' : ''}
            className={isSpinning ? 'glow-pulse' : ''}
          />
        </div>

        <h2 className="surprise-title">
          Can't Decide What to Watch?
        </h2>
        <p className="surprise-subtitle">
          Let our smart AI engine select the perfect title for your mood!
        </p>

        {selectedMovie ? (
          <div className="surprise-card-box">
            <div className="surprise-card-banner">
              <img
                src={selectedMovie.bannerUrl || selectedMovie.posterUrl}
                alt={selectedMovie.title}
                className="surprise-card-img"
              />
              <div className="surprise-card-overlay" />
              <span className="surprise-card-tag flex items-center gap-1">
                <Sparkles size={12} className="text-amber-400" /> PICK OF THE MOMENT
              </span>
            </div>

            <div className="surprise-card-body">
              <h3 className="surprise-movie-title">
                {selectedMovie.title}
              </h3>

              <div className="surprise-meta-row">
                <span className="text-match">{selectedMovie.matchPercentage}% Match</span>
                <span className="text-muted">{selectedMovie.releaseYear}</span>
                <span className="text-muted">{selectedMovie.duration}</span>
              </div>

              <div className="surprise-actions-row">
                <button
                  onClick={() => {
                    onClose();
                    onPlayMovie(selectedMovie);
                  }}
                  className="hero-btn-primary btn-surprise-action-play"
                >
                  <Play size={16} fill="#000" /> Watch Now
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onSelectMovie(selectedMovie);
                  }}
                  className="hero-btn-secondary btn-surprise-action-info"
                >
                  <Info size={16} /> Details
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <button
          onClick={handlePickRandom}
          disabled={isSpinning}
          className="btn-spin-roll"
        >
          <AppIcon
            icon={Dices}
            variant="red"
            size="sm"
            iconClassName={isSpinning ? 'animate-spin' : ''}
            text={isSpinning ? 'Shuffling Catalog...' : selectedMovie ? 'Spin Again' : 'Roll Random Movie'}
          />
        </button>
      </div>
    </div>
  );
};
