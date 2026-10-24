package com.fanrui.qms.instrumentextension.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record NormalizedFieldValue(
        String textValue,
        BigDecimal numberValue,
        LocalDate dateValue,
        LocalDateTime dateTimeValue) {

    public static NormalizedFieldValue empty() {
        return new NormalizedFieldValue(null, null, null, null);
    }

    public static NormalizedFieldValue text(String value) {
        return new NormalizedFieldValue(value, null, null, null);
    }

    public static NormalizedFieldValue number(BigDecimal value) {
        return new NormalizedFieldValue(null, value, null, null);
    }

    public static NormalizedFieldValue date(LocalDate value) {
        return new NormalizedFieldValue(null, null, value, null);
    }

    public static NormalizedFieldValue dateTime(LocalDateTime value) {
        return new NormalizedFieldValue(null, null, null, value);
    }
}
