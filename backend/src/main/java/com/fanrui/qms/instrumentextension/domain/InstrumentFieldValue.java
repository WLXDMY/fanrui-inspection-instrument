package com.fanrui.qms.instrumentextension.domain;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public record InstrumentFieldValue(
        Long id,
        long bindingId,
        long fieldDefinitionId,
        String textValue,
        BigDecimal numberValue,
        LocalDate dateValue,
        LocalDateTime dateTimeValue,
        String idempotencyKey,
        Instant createdAt,
        Instant updatedAt,
        String createdBy,
        String updatedBy) {

    public InstrumentFieldValue {
        if (bindingId <= 0 || fieldDefinitionId <= 0) {
            throw new DomainValidationException("bindingId and fieldDefinitionId must be positive");
        }
        Objects.requireNonNull(createdAt, "createdAt must not be null");
        Objects.requireNonNull(updatedAt, "updatedAt must not be null");
    }

    public static InstrumentFieldValue create(
            long bindingId,
            long definitionId,
            NormalizedFieldValue value,
            String idempotencyKey,
            Instant now,
            String actor) {
        return new InstrumentFieldValue(
                null, bindingId, definitionId, value.textValue(), value.numberValue(),
                value.dateValue(), value.dateTimeValue(), idempotencyKey,
                now, now, actor, actor);
    }
}
