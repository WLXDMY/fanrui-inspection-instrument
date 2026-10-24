package com.fanrui.qms.instrumentextension.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Objects;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

public final class FieldDefinitionRules {
    public static final int MAX_FIELDS = 10;
    public static final int MAX_SELECT_OPTIONS = 50;
    public static final int MAX_SELECT_OPTION_LENGTH = 128;

    private FieldDefinitionRules() {
    }

    public static int nextAvailableSlot(Set<Integer> occupiedSlots) {
        Objects.requireNonNull(occupiedSlots, "occupiedSlots must not be null");
        for (Integer slot : occupiedSlots) {
            if (slot == null || slot < 1 || slot > MAX_FIELDS) {
                throw new DomainValidationException("field slot must be between 1 and 10");
            }
        }
        for (int slot = 1; slot <= MAX_FIELDS; slot++) {
            if (!occupiedSlots.contains(slot)) {
                return slot;
            }
        }
        throw new DomainConflictException("global extension fields cannot exceed 10");
    }

    public static NormalizedFieldValue normalizeValue(FieldType fieldType, String rawValue) {
        Objects.requireNonNull(fieldType, "fieldType must not be null");
        String value = rawValue == null ? "" : rawValue.trim();
        if (value.isEmpty()) {
            return NormalizedFieldValue.empty();
        }
        try {
            return switch (fieldType) {
                case TEXT -> NormalizedFieldValue.text(value);
                case NUMBER -> NormalizedFieldValue.number(new BigDecimal(value));
                case DATE -> NormalizedFieldValue.date(LocalDate.parse(value));
                case DATETIME -> NormalizedFieldValue.dateTime(LocalDateTime.parse(value));
            };
        } catch (NumberFormatException | DateTimeParseException exception) {
            throw new DomainValidationException(
                    "value does not match configured type " + fieldType,
                    exception);
        }
    }

    public static List<String> normalizeSelectOptions(FieldType fieldType, List<String> selectOptions) {
        Objects.requireNonNull(fieldType, "fieldType must not be null");
        if (selectOptions == null || selectOptions.isEmpty()) {
            return List.of();
        }
        if (fieldType != FieldType.TEXT) {
            throw new DomainValidationException("selectOptions can only be configured for TEXT fields");
        }
        if (selectOptions.size() > MAX_SELECT_OPTIONS) {
            throw new DomainValidationException("selectOptions cannot exceed " + MAX_SELECT_OPTIONS);
        }
        Set<String> unique = new HashSet<>();
        List<String> normalized = selectOptions.stream().map(option -> {
            if (option == null || option.isBlank()) {
                throw new DomainValidationException("selectOptions cannot contain blank values");
            }
            String value = option.trim();
            if (value.length() > MAX_SELECT_OPTION_LENGTH) {
                throw new DomainValidationException(
                        "each select option cannot exceed " + MAX_SELECT_OPTION_LENGTH + " characters");
            }
            if (value.contains("\n") || value.contains("\r")) {
                throw new DomainValidationException("selectOptions cannot contain line breaks");
            }
            return value;
        }).toList();
        for (String option : normalized) {
            if (!unique.add(option)) {
                throw new DomainValidationException("selectOptions cannot contain duplicates");
            }
        }
        return normalized;
    }

    public static NormalizedFieldValue normalizeConfiguredValue(FieldDefinition definition, String rawValue) {
        Objects.requireNonNull(definition, "definition must not be null");
        NormalizedFieldValue normalized = normalizeValue(definition.fieldType(), rawValue);
        if (definition.selectOptions().isEmpty() || normalized.textValue() == null) {
            return normalized;
        }
        if (!definition.selectOptions().contains(normalized.textValue())) {
            throw new DomainValidationException("selected value is not in the configured options");
        }
        return normalized;
    }
}
