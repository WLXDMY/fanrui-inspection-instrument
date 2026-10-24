package com.fanrui.qms.instrumentextension.application;

import com.fanrui.qms.instrumentextension.domain.CreateFieldDefinitionCommand;
import com.fanrui.qms.instrumentextension.domain.DomainConflictException;
import com.fanrui.qms.instrumentextension.domain.FieldDefinition;
import com.fanrui.qms.instrumentextension.domain.FieldDefinitionRepository;
import com.fanrui.qms.instrumentextension.domain.FieldType;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class FieldDefinitionServiceTest {
    private final FieldDefinitionRepository repository = mock(FieldDefinitionRepository.class);
    private final Clock clock = Clock.fixed(Instant.parse("2026-08-28T12:00:00Z"), ZoneOffset.UTC);
    private final FieldDefinitionService service = new FieldDefinitionService(repository, clock);

    @Test
    void creates_the_field_in_the_first_free_global_slot() {
        when(repository.findOccupiedSlots("fanrui-main")).thenReturn(Set.of(1, 2, 4));
        when(repository.existsEnabledKey("fanrui-main", "inspection_cycle", null)).thenReturn(false);

        service.create(
                "fanrui-main",
                new CreateFieldDefinitionCommand(" 检测周期 ", " inspection_cycle ", FieldType.DATE, false, List.of()),
                "zhouj");

        ArgumentCaptor<FieldDefinition> captor = ArgumentCaptor.forClass(FieldDefinition.class);
        verify(repository).insert(captor.capture());
        assertThat(captor.getValue().slotNumber()).isEqualTo(3);
        assertThat(captor.getValue().label()).isEqualTo("检测周期");
        assertThat(captor.getValue().fieldKey()).isEqualTo("inspection_cycle");
        assertThat(captor.getValue().enabled()).isTrue();
    }

    @Test
    void refuses_an_eleventh_global_field() {
        when(repository.findOccupiedSlots("fanrui-main"))
                .thenReturn(Set.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

        assertThatThrownBy(() -> service.create(
                "fanrui-main",
                new CreateFieldDefinitionCommand("超额字段", "overflow", FieldType.TEXT, false, List.of()),
                "zhouj"))
                .isInstanceOf(DomainConflictException.class)
                .hasMessageContaining("10");
    }
}
