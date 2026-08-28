import axios from "axios";
import type { ApiResponse, Category, Movie } from "../types/movie";

const API_BASE_URL = "http://localhost:8080/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  async getAllMovies(): Promise<Movie[]> {
    const response = await apiClient.get<ApiResponse<Movie[]>>("/movies");
    return response.data.data;
  },

  async getFeaturedMovie(): Promise<Movie | null> {
    const response =
      await apiClient.get<ApiResponse<Movie>>("/movies/featured");
    return response.data.data;
  },

  async getTrendingMovies(): Promise<Movie[]> {
    const response =
      await apiClient.get<ApiResponse<Movie[]>>("/movies/trending");
    return response.data.data;
  },

  async getMoviesByCategory(slug: string): Promise<Movie[]> {
    const response = await apiClient.get<ApiResponse<Movie[]>>(
      `/movies/category/${slug}`,
    );
    return response.data.data;
  },

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await apiClient.get<ApiResponse<Movie[]>>(
      "/movies/search",
      {
        params: { q: query },
      },
    );
    return response.data.data;
  },

  async getMovieById(id: number): Promise<Movie> {
    const response = await apiClient.get<ApiResponse<Movie>>(`/movies/${id}`);
    return response.data.data;
  },

  async getAllCategories(): Promise<Category[]> {
    const response =
      await apiClient.get<ApiResponse<Category[]>>("/categories");
    return response.data.data;
  },
};
