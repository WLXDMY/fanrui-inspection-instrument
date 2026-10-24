package com.fanrui.qms.instrumentextension.domain;

public class DomainValidationException extends RuntimeException {
    public DomainValidationException(String message) {
        super(message);
    }

    public DomainValidationException(String message, Throwable cause) {
        super(message, cause);
    }
}
