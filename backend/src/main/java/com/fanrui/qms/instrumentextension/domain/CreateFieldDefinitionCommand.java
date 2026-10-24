package com.fanrui.qms.instrumentextension.domain;

import java.util.List;

public record CreateFieldDefinitionCommand(
        String label,
        String fieldKey,
        FieldType fieldType,
        boolean required,
        List<String> selectOptions) {
}
