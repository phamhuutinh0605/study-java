import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: React.ReactNode;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
  myListIds: number[];
  onToggleMyList: (movie: Movie) => void;
  isTop10?: boolean;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onSelectMovie,
  onPlayMovie,
  myListIds,
  onToggleMyList,
  isTop10 = false,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
      rowRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row-wrapper">
      {/* Row Title */}
      <div className="row-header">
        <h2 className="row-title">
          {title}
        </h2>
        <span className="row-explore-text">
          Explore All <ChevronRight size={14} />
        </span>
      </div>

      {/* Row Slider Container */}
      <div className="row-slider-box">
        {/* Left Chevron Button */}
        <button
          onClick={() => handleScroll('left')}
          className="row-chevron-btn left"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Horizontal Movie List */}
        <div
          ref={rowRef}
          className={`row-movie-list hide-scrollbar ${isTop10 ? 'top10' : ''}`}
        >
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelectMovie}
              onPlay={onPlayMovie}
              isInMyList={myListIds.includes(movie.id)}
              onToggleMyList={onToggleMyList}
              rankNumber={isTop10 ? index + 1 : undefined}
            />
          ))}
        </div>

        {/* Right Chevron Button */}
        <button
          onClick={() => handleScroll('right')}
          className="row-chevron-btn right"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

