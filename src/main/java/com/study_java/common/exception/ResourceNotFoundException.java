package com.study_java.common.exception;

import org.springframework.http.HttpStatus;

import java.util.List;

public class ResourceNotFoundException extends AppException {

    public ResourceNotFoundException(String message) {
        super(
                HttpStatus.NOT_FOUND,
                message,
                List.of()
        );
    }
}