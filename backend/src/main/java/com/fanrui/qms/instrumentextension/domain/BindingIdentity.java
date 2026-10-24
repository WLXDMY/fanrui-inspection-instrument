package com.fanrui.qms.instrumentextension.domain;

public record BindingIdentity(String sourceInstance, String sourceInstrumentId) {
    public BindingIdentity {
        sourceInstance = requireText(sourceInstance, "sourceInstance");
        sourceInstrumentId = requireText(sourceInstrumentId, "sourceInstrumentId");
    }

    private static String requireText(String value, String name) {
        if (value == null || value.isBlank()) {
            throw new DomainValidationException(name + " must not be blank");
        }
        return value.trim();
    }
}
