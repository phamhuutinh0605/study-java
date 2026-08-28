import { useQuery } from "@tanstack/react-query";
import {
  FIVE_MINUTES,
  THIRTY_MINUTES,
  THIRTY_SECONDS,
} from "../constants/cache-time";
import { movieKeys } from "../constants/keys";
import { apiService } from "../services/api";

// Hook: Fetch all movies
export function useAllMovies() {
  return useQuery({
    queryKey: movieKeys.lists(),
    queryFn: () => apiService.getAllMovies(),
    staleTime: FIVE_MINUTES, // 5 minutes cache
  });
}

// Hook: Fetch featured banner movie
export function useFeaturedMovie() {
  return useQuery({
    queryKey: movieKeys.featured(),
    queryFn: () => apiService.getFeaturedMovie(),
    staleTime: FIVE_MINUTES,
  });
}

// Hook: Fetch trending movies
export function useTrendingMovies() {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn: () => apiService.getTrendingMovies(),
    staleTime: FIVE_MINUTES,
  });
}

// Hook: Fetch movies by category slug
export function useMoviesByCategory(slug: string) {
  return useQuery({
    queryKey: movieKeys.byCategory(slug),
    queryFn: () => apiService.getMoviesByCategory(slug),
    enabled: !!slug && slug !== "all" && slug !== "my-list",
    staleTime: FIVE_MINUTES,
  });
}

// Hook: Search movies with query string
export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => apiService.searchMovies(query),
    enabled: query.trim().length > 0,
    staleTime: THIRTY_SECONDS, // 30 seconds
  });
}

// Hook: Fetch single movie details by ID
export function useMovieDetail(id: number | null) {
  return useQuery({
    queryKey: id ? movieKeys.detail(id) : ["movies", "detail", "none"],
    queryFn: () => (id ? apiService.getMovieById(id) : null),
    enabled: !!id,
  });
}

// Hook: Fetch all movie categories
export function useCategories() {
  return useQuery({
    queryKey: movieKeys.categories,
    queryFn: () => apiService.getAllCategories(),
    staleTime: THIRTY_MINUTES, // 30 minutes
  });
}
