package com.fanrui.qms.instrumentextension.domain;

import java.time.Instant;
import java.util.Objects;

public record InstrumentBinding(
        Long id,
        BindingIdentity identity,
        String instrumentCode,
        String instrumentName,
        String status,
        Instant synchronizedAt,
        String createdBy,
        String updatedBy) {

    public InstrumentBinding {
        Objects.requireNonNull(identity, "identity must not be null");
        instrumentCode = requireText(instrumentCode, "instrumentCode");
        instrumentName = requireText(instrumentName, "instrumentName");
        status = requireText(status, "status");
        Objects.requireNonNull(synchronizedAt, "synchronizedAt must not be null");
        createdBy = requireText(createdBy, "createdBy");
        updatedBy = requireText(updatedBy, "updatedBy");
    }

    public InstrumentBinding synchronize(SourceInstrumentSnapshot source, Instant at, String actor) {
        return new InstrumentBinding(
                id, identity, source.instrumentCode(), source.instrumentName(), source.status(),
                at, createdBy, actor);
    }

    private static String requireText(String value, String name) {
        if (value == null || value.isBlank()) {
            throw new DomainValidationException(name + " must not be blank");
        }
        return value.trim();
    }
}
