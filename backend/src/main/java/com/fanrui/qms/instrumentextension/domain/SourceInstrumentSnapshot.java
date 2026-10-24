package com.fanrui.qms.instrumentextension.domain;

public record SourceInstrumentSnapshot(String instrumentCode, String instrumentName, String status) {
    public SourceInstrumentSnapshot {
        instrumentCode = requireText(instrumentCode, "instrumentCode");
        instrumentName = requireText(instrumentName, "instrumentName");
        status = requireText(status, "status");
    }

    private static String requireText(String value, String name) {
        if (value == null || value.isBlank()) {
            throw new DomainValidationException(name + " must not be blank");
        }
        return value.trim();
    }
}
