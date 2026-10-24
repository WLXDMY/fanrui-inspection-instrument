package com.fanrui.qms.instrumentextension.domain;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Instant;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FieldDefinitionRulesTest {

    @Test
    void returns_first_free_slot_and_never_exceeds_ten_global_fields() {
        assertThat(FieldDefinitionRules.nextAvailableSlot(Set.of(1, 2, 4))).isEqualTo(3);

        assertThatThrownBy(() -> FieldDefinitionRules.nextAvailableSlot(
                Set.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)))
                .isInstanceOf(DomainConflictException.class)
                .hasMessageContaining("10");
    }

    @Test
    void normalizes_values_into_the_column_matching_the_configured_type() {
        NormalizedFieldValue text = FieldDefinitionRules.normalizeValue(FieldType.TEXT, "  校准完成  ");
        NormalizedFieldValue number = FieldDefinitionRules.normalizeValue(FieldType.NUMBER, "12.50");
        NormalizedFieldValue date = FieldDefinitionRules.normalizeValue(FieldType.DATE, "2026-08-28");
        NormalizedFieldValue dateTime = FieldDefinitionRules.normalizeValue(FieldType.DATETIME, "2026-08-28T14:30:00");
        FieldDefinition select = new FieldDefinition(
                1L, "fanrui-main", 1, "valid_days", "检验有效期天数", FieldType.TEXT,
                List.of("30", "90", "180", "365"), false, true, Instant.EPOCH, Instant.EPOCH, "tester", "tester");
        NormalizedFieldValue selectedOption = FieldDefinitionRules.normalizeConfiguredValue(select, "180");

        assertThat(text.textValue()).isEqualTo("校准完成");
        assertThat(number.numberValue()).isEqualByComparingTo(new BigDecimal("12.50"));
        assertThat(date.dateValue()).isEqualTo(LocalDate.of(2026, 8, 28));
        assertThat(dateTime.dateTimeValue()).isEqualTo(LocalDateTime.of(2026, 8, 28, 14, 30));
        assertThat(selectedOption.textValue()).isEqualTo("180");
    }

    @Test
    void rejects_a_value_that_does_not_match_its_configured_type() {
        assertThatThrownBy(() -> FieldDefinitionRules.normalizeValue(FieldType.DATE, "not-a-date"))
                .isInstanceOf(DomainValidationException.class)
                .hasMessageContaining("DATE");
    }

    @Test
    void validates_select_options_and_rejects_values_outside_the_configuration() {
        assertThat(FieldDefinitionRules.normalizeSelectOptions(
                FieldType.TEXT, List.of("30", "90", "180", "365")))
                .containsExactly("30", "90", "180", "365");

        assertThatThrownBy(() -> FieldDefinitionRules.normalizeSelectOptions(
                FieldType.NUMBER, List.of("30")))
                .isInstanceOf(DomainValidationException.class)
                .hasMessageContaining("TEXT");

        FieldDefinition definition = new FieldDefinition(
                1L, "fanrui-main", 1, "valid_days", "检验有效期天数", FieldType.TEXT,
                List.of("30", "90"), false, true, Instant.EPOCH, Instant.EPOCH, "tester", "tester");
        assertThatThrownBy(() -> FieldDefinitionRules.normalizeConfiguredValue(definition, "365"))
                .isInstanceOf(DomainValidationException.class)
                .hasMessageContaining("configured options");
    }
}
