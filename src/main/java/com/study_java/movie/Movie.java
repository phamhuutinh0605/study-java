package com.study_java.movie;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "banner_url")
    private String bannerUrl;

    @Column(name = "trailer_url")
    private String trailerUrl;

    @Column(name = "release_year")
    private Integer releaseYear;

    private Double rating;

    private String duration;

    @Column(name = "match_percentage")
    private Integer matchPercentage;

    @Column(name = "age_rating")
    private String ageRating;

    @Column(name = "is_featured")
    private Boolean isFeatured = false;

    @Column(name = "is_trending")
    private Boolean isTrending = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    public Movie() {
    }

    public Movie(String title, String description, String posterUrl, String bannerUrl, String trailerUrl,
                 Integer releaseYear, Double rating, String duration, Integer matchPercentage, String ageRating,
                 Boolean isFeatured, Boolean isTrending, Category category) {
        this.title = title;
        this.description = description;
        this.posterUrl = posterUrl;
        this.bannerUrl = bannerUrl;
        this.trailerUrl = trailerUrl;
        this.releaseYear = releaseYear;
        this.rating = rating;
        this.duration = duration;
        this.matchPercentage = matchPercentage;
        this.ageRating = ageRating;
        this.isFeatured = isFeatured;
        this.isTrending = isTrending;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosterUrl() {
        return posterUrl;
    }

    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getBannerUrl() {
        return bannerUrl;
    }

    public void setBannerUrl(String bannerUrl) {
        this.bannerUrl = bannerUrl;
    }

    public String getTrailerUrl() {
        return trailerUrl;
    }

    public void setTrailerUrl(String trailerUrl) {
        this.trailerUrl = trailerUrl;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(Integer matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public String getAgeRating() {
        return ageRating;
    }

    public void setAgeRating(String ageRating) {
        this.ageRating = ageRating;
    }

    public Boolean getIsFeatured() {
        return isFeatured;
    }

    public void setIsFeatured(Boolean featured) {
        isFeatured = featured;
    }

    public Boolean getIsTrending() {
        return isTrending;
    }

    public void setIsTrending(Boolean trending) {
        isTrending = trending;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
