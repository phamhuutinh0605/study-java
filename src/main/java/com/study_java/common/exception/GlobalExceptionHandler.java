package com.study_java.common.exception;

import com.study_java.common.dto.ApiErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiErrorResponse> handleAppException(
            AppException ex
    ) {
        return ResponseEntity
                .status(ex.getStatus())
                .body(
                        new ApiErrorResponse(
                                ex.getStatus().value(),
                                ex.getMessage(),
                                ex.getErrors()
                        )
                );
    }
}