package com.study_java.movie.dto;

import com.study_java.movie.Movie;

public record MovieDto(
        Long id,
        String title,
        String description,
        String posterUrl,
        String bannerUrl,
        String trailerUrl,
        Integer releaseYear,
        Double rating,
        String duration,
        Integer matchPercentage,
        String ageRating,
        Boolean isFeatured,
        Boolean isTrending,
        CategoryDto category
) {
    public static MovieDto fromEntity(Movie movie) {
        if (movie == null) return null;
        return new MovieDto(
                movie.getId(),
                movie.getTitle(),
                movie.getDescription(),
                movie.getPosterUrl(),
                movie.getBannerUrl(),
                movie.getTrailerUrl(),
                movie.getReleaseYear(),
                movie.getRating(),
                movie.getDuration(),
                movie.getMatchPercentage(),
                movie.getAgeRating(),
                movie.getIsFeatured(),
                movie.getIsTrending(),
                CategoryDto.fromEntity(movie.getCategory())
        );
    }
}
