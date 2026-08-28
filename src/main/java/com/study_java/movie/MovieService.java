package com.study_java.movie;

import com.study_java.movie.dto.CategoryDto;
import com.study_java.movie.dto.MovieDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class MovieService {

    private final MovieRepository movieRepository;
    private final CategoryRepository categoryRepository;

    public MovieService(MovieRepository movieRepository, CategoryRepository categoryRepository) {
        this.movieRepository = movieRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<MovieDto> getAllMovies() {
        return movieRepository.findAll().stream()
                .map(MovieDto::fromEntity)
                .toList();
    }

    public MovieDto getMovieById(Long id) {
        return movieRepository.findById(id)
                .map(MovieDto::fromEntity)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
    }

    public MovieDto getFeaturedMovie() {
        return movieRepository.findFeaturedMovie()
                .map(MovieDto::fromEntity)
                .orElseGet(() -> movieRepository.findAll().stream()
                        .findFirst()
                        .map(MovieDto::fromEntity)
                        .orElse(null));
    }

    public List<MovieDto> getTrendingMovies() {
        return movieRepository.findByIsTrendingTrue().stream()
                .map(MovieDto::fromEntity)
                .toList();
    }

    public List<MovieDto> getMoviesByCategory(String categorySlug) {
        return movieRepository.findByCategorySlug(categorySlug).stream()
                .map(MovieDto::fromEntity)
                .toList();
    }

    public List<MovieDto> searchMovies(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllMovies();
        }
        return movieRepository.searchMovies(query.trim()).stream()
                .map(MovieDto::fromEntity)
                .toList();
    }

    public List<CategoryDto> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(CategoryDto::fromEntity)
                .toList();
    }
}
