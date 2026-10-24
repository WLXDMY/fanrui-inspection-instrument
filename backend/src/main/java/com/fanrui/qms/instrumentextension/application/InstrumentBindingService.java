package com.fanrui.qms.instrumentextension.application;

import com.fanrui.qms.instrumentextension.domain.BindingIdentity;
import com.fanrui.qms.instrumentextension.domain.InstrumentBinding;
import com.fanrui.qms.instrumentextension.domain.InstrumentBindingRepository;
import com.fanrui.qms.instrumentextension.domain.SourceInstrumentSnapshot;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;

@Service
public class InstrumentBindingService {
    private final InstrumentBindingRepository repository;
    private final Clock clock;

    public InstrumentBindingService(InstrumentBindingRepository repository, Clock clock) {
        this.repository = repository;
        this.clock = clock;
    }

    @Transactional
    public InstrumentBinding synchronize(
            BindingIdentity identity,
            SourceInstrumentSnapshot source,
            String actor) {
        InstrumentBinding binding = repository.findByIdentity(identity)
                .map(existing -> existing.synchronize(source, clock.instant(), actor))
                .orElseGet(() -> new InstrumentBinding(
                        null, identity, source.instrumentCode(), source.instrumentName(), source.status(),
                        clock.instant(), actor, actor));
        return repository.save(binding);
    }
}
