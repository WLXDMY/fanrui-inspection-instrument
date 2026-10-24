package com.fanrui.qms.instrumentextension.application;

import com.fanrui.qms.instrumentextension.domain.BindingIdentity;
import com.fanrui.qms.instrumentextension.domain.InstrumentBinding;
import com.fanrui.qms.instrumentextension.domain.InstrumentBindingRepository;
import com.fanrui.qms.instrumentextension.domain.SourceInstrumentSnapshot;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class InstrumentBindingServiceTest {
    private final InstrumentBindingRepository repository = mock(InstrumentBindingRepository.class);
    private final Clock clock = Clock.fixed(Instant.parse("2026-08-28T12:00:00Z"), ZoneOffset.UTC);
    private final InstrumentBindingService service = new InstrumentBindingService(repository, clock);

    @Test
    void updating_source_code_and_name_keeps_the_existing_binding_id() {
        BindingIdentity identity = new BindingIdentity("fanrui-main", "1");
        InstrumentBinding existing = new InstrumentBinding(
                99L, identity, "FR0001-1", "内径千分尺", "ENABLED",
                Instant.parse("2026-08-27T12:00:00Z"), "system", "system");
        when(repository.findByIdentity(identity)).thenReturn(Optional.of(existing));

        service.synchronize(
                identity,
                new SourceInstrumentSnapshot("FR0001-NEW", "内径千分尺（已校准）", "ENABLED"),
                "zhouj");

        ArgumentCaptor<InstrumentBinding> captor = ArgumentCaptor.forClass(InstrumentBinding.class);
        verify(repository).save(captor.capture());
        assertThat(captor.getValue().id()).isEqualTo(99L);
        assertThat(captor.getValue().identity()).isEqualTo(identity);
        assertThat(captor.getValue().instrumentCode()).isEqualTo("FR0001-NEW");
        assertThat(captor.getValue().instrumentName()).isEqualTo("内径千分尺（已校准）");
        assertThat(captor.getValue().updatedBy()).isEqualTo("zhouj");
    }
}
