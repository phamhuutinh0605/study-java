package com.study_java.movie;

import com.study_java.common.dto.ApiSuccessResponse;
import com.study_java.movie.dto.MovieDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<ApiSuccessResponse<List<MovieDto>>> getAllMovies() {
        List<MovieDto> movies = movieService.getAllMovies();
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Movies fetched successfully", movies));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiSuccessResponse<MovieDto>> getFeaturedMovie() {
        MovieDto movie = movieService.getFeaturedMovie();
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Featured movie fetched successfully", movie));
    }

    @GetMapping("/trending")
    public ResponseEntity<ApiSuccessResponse<List<MovieDto>>> getTrendingMovies() {
        List<MovieDto> movies = movieService.getTrendingMovies();
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Trending movies fetched successfully", movies));
    }

    @GetMapping("/category/{slug}")
    public ResponseEntity<ApiSuccessResponse<List<MovieDto>>> getMoviesByCategory(@PathVariable String slug) {
        List<MovieDto> movies = movieService.getMoviesByCategory(slug);
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Category movies fetched successfully", movies));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiSuccessResponse<List<MovieDto>>> searchMovies(@RequestParam(name = "q", required = false) String query) {
        List<MovieDto> movies = movieService.searchMovies(query);
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Search results fetched successfully", movies));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiSuccessResponse<MovieDto>> getMovieById(@PathVariable Long id) {
        MovieDto movie = movieService.getMovieById(id);
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Movie detail fetched successfully", movie));
    }
}
