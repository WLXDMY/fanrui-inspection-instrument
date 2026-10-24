package com.fanrui.qms.instrumentextension.domain;

import java.time.Instant;
import java.util.Objects;

public record BindingSnapshot(
        BindingIdentity identity,
        String instrumentCode,
        String instrumentName,
        String status,
        Instant synchronizedAt) {

    public BindingSnapshot {
        Objects.requireNonNull(identity, "identity must not be null");
        instrumentCode = requireText(instrumentCode, "instrumentCode");
        instrumentName = requireText(instrumentName, "instrumentName");
        status = requireText(status, "status");
        Objects.requireNonNull(synchronizedAt, "synchronizedAt must not be null");
    }

    public BindingSnapshot synchronize(
            String newInstrumentCode,
            String newInstrumentName,
            String newStatus,
            Instant synchronizedAt) {
        return new BindingSnapshot(
                identity,
                newInstrumentCode,
                newInstrumentName,
                newStatus,
                synchronizedAt);
    }

    private static String requireText(String value, String name) {
        if (value == null || value.isBlank()) {
            throw new DomainValidationException(name + " must not be blank");
        }
        return value.trim();
    }
}
