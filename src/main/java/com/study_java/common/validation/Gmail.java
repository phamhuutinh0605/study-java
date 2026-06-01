package com.study_java.common.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = GmailValidator.class)
public @interface Gmail {
    String message() default "Email must be a Gmail address";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}