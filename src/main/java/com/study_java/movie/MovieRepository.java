package com.study_java.movie;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByCategorySlug(String slug);
    List<Movie> findByIsTrendingTrue();
    List<Movie> findByIsFeaturedTrue();

    @Query("SELECT m FROM Movie m WHERE LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(m.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Movie> searchMovies(@Param("query") String query);

    @Query(value = "SELECT * FROM movies WHERE is_featured = true ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<Movie> findFeaturedMovie();
}
