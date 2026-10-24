package com.fanrui.qms.instrumentextension.domain;

import java.util.List;

public interface InstrumentFieldValueRepository {
    List<InstrumentFieldValue> findByBindingId(long bindingId);

    InstrumentFieldValue upsert(InstrumentFieldValue value);
}
