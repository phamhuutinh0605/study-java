import { useState, useMemo, useEffect } from 'react';
import {
  Trophy,
  Zap,
  Rocket,
  Heart,
  Clapperboard,
  Flame,
  Bookmark,
  Film,
  Search,
  SearchX,
  ServerOff,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MovieRow } from './components/MovieRow';
import { MovieModal } from './components/MovieModal';
import { CategoryBar } from './components/CategoryBar';
import { SurpriseModal } from './components/SurpriseModal';
import { Toast, type ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { AppIcon } from './components/AppIcon';
import {
  useAllMovies,
  useFeaturedMovie,
  useTrendingMovies,
  useSearchMovies,
  useMoviesByCategory,
  useCategories,
} from './hooks/useMovies';
import type { Movie } from './types/movie';

export function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPlayingTrailer, setIsPlayingTrailer] = useState<boolean>(false);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Persistence for user's My List
  const [myListIds, setMyListIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('netflix_my_list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('netflix_my_list', JSON.stringify(myListIds));
  }, [myListIds]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({
      id: Date.now().toString(),
      type,
      text,
    });
  };

  // TanStack Query Hooks
  const { data: allMovies = [], isLoading: isLoadingAll, isError: isErrorAll } = useAllMovies();
  const { data: featuredMovie = null } = useFeaturedMovie();
  const { data: trendingMovies = [] } = useTrendingMovies();
  const { data: categories = [] } = useCategories();
  const { data: categoryMovies = [] } = useMoviesByCategory(activeCategory);
  const { data: searchResults = [] } = useSearchMovies(searchQuery);

  const handleToggleMyList = (movie: Movie) => {
    setMyListIds((prev) => {
      const isAlreadyIn = prev.includes(movie.id);
      const updated = isAlreadyIn ? prev.filter((id) => id !== movie.id) : [...prev, movie.id];
      showToast(isAlreadyIn ? `Removed "${movie.title}" from My List` : `Added "${movie.title}" to My List!`);
      return updated;
    });
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayingTrailer(false);
  };

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsPlayingTrailer(true);
  };

  // Filtered movies based on TanStack Query state & category selection
  const displayedMovies = useMemo(() => {
    if (searchQuery.trim()) {
      return searchResults;
    }
    if (activeCategory === 'my-list') {
      return allMovies.filter((m) => myListIds.includes(m.id));
    }
    if (activeCategory === 'trending') {
      return trendingMovies.length > 0 ? trendingMovies : allMovies.filter((m) => m.isTrending);
    }
    if (activeCategory !== 'all') {
      return categoryMovies;
    }
    return allMovies;
  }, [searchQuery, searchResults, activeCategory, myListIds, allMovies, trendingMovies, categoryMovies]);

  // Category subsets for horizontal rows
  const actionMovies = useMemo(() => allMovies.filter((m) => m.category?.slug === 'action'), [allMovies]);
  const sciFiMovies = useMemo(() => allMovies.filter((m) => m.category?.slug === 'sci-fi'), [allMovies]);
  const dramaMovies = useMemo(() => allMovies.filter((m) => m.category?.slug === 'drama'), [allMovies]);
  const myListMovies = useMemo(() => allMovies.filter((m) => myListIds.includes(m.id)), [allMovies, myListIds]);

  return (
    <div className="app-container">
      {/* Navbar Header */}
      <Navbar
        onSearch={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
        }}
        myListCount={myListIds.length}
        onOpenSurprise={() => setIsSurpriseOpen(true)}
        onShowToast={(msg) => showToast(msg, 'info')}
      />

      {/* TanStack Query Loading State */}
      {isLoadingAll ? (
        <div className="app-center-loading">
          <div className="app-logo-margin">
            <Logo size="lg" />
          </div>
          <AppIcon icon={Loader2} variant="red" size="lg" iconClassName="animate-spin text-red-500" className="my-3 glow-pulse" />
          <div className="skeleton app-loading-bar" />
          <p className="app-loading-text">Fetching streaming catalog via TanStack Query...</p>
        </div>
      ) : isErrorAll ? (
        /* TanStack Query Error State */
        <div className="app-center-error">
          <AppIcon icon={ServerOff} variant="red" size="xl" className="mb-4 glow-pulse" />
          <div className="app-error-title">Backend Connection Lost</div>
          <p className="app-error-text">
            Please ensure Spring Boot backend is actively serving APIs on <code>http://localhost:8080</code>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="hero-btn-primary app-btn-retry"
          >
            <AppIcon icon={RefreshCw} size="sm" text="Retry Connecting API" />
          </button>
        </div>
      ) : (
        <div className="w-full">
          {/* Hero Featured Movie Banner */}
          {!searchQuery && activeCategory === 'all' && (
            <HeroBanner
              movie={featuredMovie || (allMovies.length > 0 ? allMovies[0] : null)}
              onPlay={handlePlayMovie}
              onMoreInfo={handleSelectMovie}
            />
          )}

          {/* Sticky Category Chip Filter Bar */}
          <CategoryBar
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setSearchQuery('');
            }}
            myListCount={myListIds.length}
          />

          {/* Search Results or Category Filter Grid */}
          {searchQuery || activeCategory !== 'all' ? (
            <div className="app-grid-section">
              <h2 className="app-section-title">
                {searchQuery ? (
                  <AppIcon icon={Search} variant="red" size="md" text={`Search Results for "${searchQuery}"`} />
                ) : activeCategory === 'my-list' ? (
                  <AppIcon icon={Bookmark} variant="red" fill="var(--netflix-red)" size="md" text="My Bookmarked Movies" />
                ) : activeCategory === 'trending' ? (
                  <AppIcon icon={Flame} variant="orange" fill="#FB923C" iconClassName="animate-pulse" size="md" text="Trending Titles" />
                ) : (
                  <AppIcon icon={Film} variant="purple" size="md" text={`${activeCategory.toUpperCase()} Selection`} />
                )}
              </h2>

              {displayedMovies.length === 0 ? (
                <div className="app-empty-state flex flex-col items-center justify-center">
                  <AppIcon icon={SearchX} variant="blue" size="xl" className="mb-4" />
                  <p className="app-empty-text">No titles found matching your selection.</p>
                </div>
              ) : (
                <div className="app-movie-grid">
                  {displayedMovies.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie)}
                      className="app-grid-card"
                    >
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="app-grid-card-img"
                      />
                      <div className="app-grid-card-body">
                        <h4 className="app-grid-card-title">{movie.title}</h4>
                        <div className="app-grid-card-meta">
                          <span className="text-match">{movie.matchPercentage}% Match</span>
                          <span className="text-muted">{movie.releaseYear}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Home Carousels */
            <div className="app-rows-container">
              {/* TOP 10 TRENDING ROW */}
              <MovieRow
                title={
                  <AppIcon icon={Trophy} variant="gold" fill="#FBBF24" size="md" text="Top 10 Movies Today in USA" />
                }
                movies={trendingMovies.length > 0 ? trendingMovies : allMovies}
                onSelectMovie={handleSelectMovie}
                onPlayMovie={handlePlayMovie}
                myListIds={myListIds}
                onToggleMyList={handleToggleMyList}
                isTop10={true}
              />

              <MovieRow
                title={
                  <AppIcon icon={Zap} variant="orange" fill="#FB923C" size="md" text="Action & High-Octane Thrillers" />
                }
                movies={actionMovies}
                onSelectMovie={handleSelectMovie}
                onPlayMovie={handlePlayMovie}
                myListIds={myListIds}
                onToggleMyList={handleToggleMyList}
              />

              <MovieRow
                title={
                  <AppIcon icon={Rocket} variant="blue" size="md" text="Sci-Fi & Cyberpunk Adventures" />
                }
                movies={sciFiMovies}
                onSelectMovie={handleSelectMovie}
                onPlayMovie={handlePlayMovie}
                myListIds={myListIds}
                onToggleMyList={handleToggleMyList}
              />

              {myListMovies.length > 0 && (
                <MovieRow
                  title={
                    <AppIcon icon={Heart} variant="red" fill="#EF4444" size="md" text="My Saved Watchlist" />
                  }
                  movies={myListMovies}
                  onSelectMovie={handleSelectMovie}
                  onPlayMovie={handlePlayMovie}
                  myListIds={myListIds}
                  onToggleMyList={handleToggleMyList}
                />
              )}

              <MovieRow
                title={
                  <AppIcon icon={Clapperboard} variant="purple" size="md" text="Critically Acclaimed Dramas" />
                }
                movies={dramaMovies}
                onSelectMovie={handleSelectMovie}
                onPlayMovie={handlePlayMovie}
                myListIds={myListIds}
                onToggleMyList={handleToggleMyList}
              />
            </div>
          )}
        </div>
      )}

      {/* Footer Section */}
      <Footer />

      {/* Details & Trailer Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => {
          setSelectedMovie(null);
          setIsPlayingTrailer(false);
        }}
        isInMyList={selectedMovie ? myListIds.includes(selectedMovie.id) : false}
        onToggleMyList={handleToggleMyList}
        initialPlayTrailer={isPlayingTrailer}
        allMovies={allMovies}
        onSelectMovie={handleSelectMovie}
        onShowToast={(msg) => showToast(msg, 'info')}
      />

      {/* Surprise Me Random Selector Modal */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        movies={allMovies}
        onSelectMovie={handleSelectMovie}
        onPlayMovie={handlePlayMovie}
      />

      {/* Toast Notification Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;

