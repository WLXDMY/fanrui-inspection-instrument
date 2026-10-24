package com.fanrui.qms.instrumentextension.integration;

import com.fanrui.qms.instrumentextension.domain.SourceInstrumentSnapshot;

public interface InstrumentSourceClient {
    SourceInstrumentSnapshot fetch(String sourceInstrumentId, String authorizationHeader);
}
