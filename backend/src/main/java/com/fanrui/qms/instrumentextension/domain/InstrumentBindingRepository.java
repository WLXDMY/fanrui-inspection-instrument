package com.fanrui.qms.instrumentextension.domain;

import java.util.Optional;

public interface InstrumentBindingRepository {
    Optional<InstrumentBinding> findByIdentity(BindingIdentity identity);

    InstrumentBinding save(InstrumentBinding binding);
}
