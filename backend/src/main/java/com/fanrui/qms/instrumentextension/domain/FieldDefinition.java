package com.fanrui.qms.instrumentextension.domain;

import java.time.Instant;
import java.util.List;
import java.util.Objects;

public record FieldDefinition(
        Long id,
        String sourceInstance,
        int slotNumber,
        String fieldKey,
        String label,
        FieldType fieldType,
        List<String> selectOptions,
        boolean required,
        boolean enabled,
        Instant createdAt,
        Instant updatedAt,
        String createdBy,
        String updatedBy) {

    public FieldDefinition {
        sourceInstance = requireText(sourceInstance, "sourceInstance");
        if (slotNumber < 1 || slotNumber > FieldDefinitionRules.MAX_FIELDS) {
            throw new DomainValidationException("slotNumber must be between 1 and 10");
        }
        fieldKey = normalizeKey(fieldKey);
        label = requireText(label, "label");
        Objects.requireNonNull(fieldType, "fieldType must not be null");
        selectOptions = FieldDefinitionRules.normalizeSelectOptions(fieldType, selectOptions);
        Objects.requireNonNull(createdAt, "createdAt must not be null");
        Objects.requireNonNull(updatedAt, "updatedAt must not be null");
        createdBy = requireText(createdBy, "createdBy");
        updatedBy = requireText(updatedBy, "updatedBy");
    }

    public static String normalizeKey(String value) {
        String key = requireText(value, "fieldKey");
        if (!key.matches("[a-z][a-z0-9_]{0,63}")) {
            throw new DomainValidationException("fieldKey must use lowercase letters, digits and underscores");
        }
        return key;
    }

    private static String requireText(String value, String name) {
        if (value == null || value.isBlank()) {
            throw new DomainValidationException(name + " must not be blank");
        }
        return value.trim();
    }
}
