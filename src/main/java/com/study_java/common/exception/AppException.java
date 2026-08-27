package com.study_java.common.exception;

import org.springframework.http.HttpStatus;

public class AppException extends RuntimeException {

    private final HttpStatus status;
    private final Object errors;

    public AppException(
            HttpStatus status,
            String message
    ) {
        super(message);
        this.status = status;
        this.errors = null;
    }

    public AppException(
            HttpStatus status,
            String message,
            Object errors
    ) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public Object getErrors() {
        System.out.println("errors: " + errors);
        return errors;
    }
}