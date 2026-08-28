export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  trailerUrl: string;
  releaseYear: number;
  rating: number;
  duration: string;
  matchPercentage: number;
  ageRating: string;
  isFeatured: boolean;
  isTrending: boolean;
  category: Category;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
