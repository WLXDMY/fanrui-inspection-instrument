package com.fanrui.qms.instrumentextension.domain;

public class DomainConflictException extends RuntimeException {
    public DomainConflictException(String message) {
        super(message);
    }
}
