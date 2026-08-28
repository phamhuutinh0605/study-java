package com.study_java.movie;

import com.study_java.common.dto.ApiSuccessResponse;
import com.study_java.movie.dto.CategoryDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final MovieService movieService;

    public CategoryController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public ResponseEntity<ApiSuccessResponse<List<CategoryDto>>> getAllCategories() {
        List<CategoryDto> categories = movieService.getAllCategories();
        return ResponseEntity.ok(new ApiSuccessResponse<>(200, "Categories fetched successfully", categories));
    }
}
