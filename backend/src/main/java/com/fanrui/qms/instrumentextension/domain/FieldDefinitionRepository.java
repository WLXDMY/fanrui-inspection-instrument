package com.fanrui.qms.instrumentextension.domain;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface FieldDefinitionRepository {
    Set<Integer> findOccupiedSlots(String sourceInstance);

    boolean existsEnabledKey(String sourceInstance, String fieldKey, Long excludedId);

    FieldDefinition insert(FieldDefinition definition);

    FieldDefinition update(FieldDefinition definition);

    Optional<FieldDefinition> findById(String sourceInstance, long id);

    List<FieldDefinition> findAll(String sourceInstance, boolean includeDisabled);
}
