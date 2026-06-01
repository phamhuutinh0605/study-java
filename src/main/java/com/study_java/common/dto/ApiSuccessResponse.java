package com.study_java.common.dto;

public record ApiSuccessResponse<T>(
        int statusCode,
        String message,
        T data
) {
}