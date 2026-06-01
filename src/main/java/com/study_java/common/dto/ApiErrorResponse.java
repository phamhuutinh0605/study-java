package com.study_java.common.dto;

public record ApiErrorResponse(
        int statusCode,
        String message,
        Object errors
) {
}