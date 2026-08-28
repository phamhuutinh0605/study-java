package com.study_java.movie.dto;

import com.study_java.movie.Category;

public record CategoryDto(
        Long id,
        String name,
        String slug
) {
    public static CategoryDto fromEntity(Category category) {
        if (category == null) return null;
        return new CategoryDto(category.getId(), category.getName(), category.getSlug());
    }
}
