package com.fanrui.qms.instrumentextension.domain;

import java.util.List;

public record InstrumentExtensionView(
        InstrumentBinding binding,
        List<FieldDefinition> fields,
        List<InstrumentFieldValue> values) {
}
