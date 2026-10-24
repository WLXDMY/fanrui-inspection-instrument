package com.fanrui.qms.instrumentextension.api;

import com.fanrui.qms.instrumentextension.domain.DomainConflictException;
import com.fanrui.qms.instrumentextension.domain.DomainNotFoundException;
import com.fanrui.qms.instrumentextension.domain.DomainValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(DomainValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, Object> validation(DomainValidationException exception) {
        return error("VALIDATION_ERROR", exception.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    Map<String, Object> beanValidation(MethodArgumentNotValidException exception) {
        return error("VALIDATION_ERROR", "request validation failed");
    }

    @ExceptionHandler(DomainConflictException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    Map<String, Object> conflict(DomainConflictException exception) {
        return error("CONFLICT", exception.getMessage());
    }

    @ExceptionHandler(DomainNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    Map<String, Object> notFound(DomainNotFoundException exception) {
        return error("NOT_FOUND", exception.getMessage());
    }

    private Map<String, Object> error(String code, String message) {
        return Map.of("code", code, "message", message, "timestamp", Instant.now().toString());
    }
}
