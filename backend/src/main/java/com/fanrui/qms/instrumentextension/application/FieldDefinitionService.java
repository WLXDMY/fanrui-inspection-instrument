package com.fanrui.qms.instrumentextension.application;

import com.fanrui.qms.instrumentextension.domain.CreateFieldDefinitionCommand;
import com.fanrui.qms.instrumentextension.domain.DomainConflictException;
import com.fanrui.qms.instrumentextension.domain.DomainValidationException;
import com.fanrui.qms.instrumentextension.domain.FieldDefinition;
import com.fanrui.qms.instrumentextension.domain.FieldDefinitionRepository;
import com.fanrui.qms.instrumentextension.domain.FieldDefinitionRules;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.List;

@Service
public class FieldDefinitionService {
    private final FieldDefinitionRepository repository;
    private final Clock clock;

    public FieldDefinitionService(FieldDefinitionRepository repository, Clock clock) {
        this.repository = repository;
        this.clock = clock;
    }

    @Transactional
    public FieldDefinition create(
            String sourceInstance,
            CreateFieldDefinitionCommand command,
            String actor) {
        String normalizedSource = requireText(sourceInstance, "sourceInstance");
        String normalizedKey = FieldDefinition.normalizeKey(command.fieldKey());
        if (repository.existsEnabledKey(normalizedSource, normalizedKey, null)) {
            throw new DomainConflictException("fieldKey already exists: " + normalizedKey);
        }
        int slot = FieldDefinitionRules.nextAvailableSlot(repository.findOccupiedSlots(normalizedSource));
        Instant now = clock.instant();
        FieldDefinition definition = new FieldDefinition(
                null, normalizedSource, slot, normalizedKey, command.label(), command.fieldType(),
                command.selectOptions(), command.required(), true, now, now, actor, actor);
        return repository.insert(definition);
    }

    @Transactional(readOnly = true)
    public List<FieldDefinition> list(String sourceInstance, boolean includeDisabled) {
        return repository.findAll(requireText(sourceInstance, "sourceInstance"), includeDisabled);
    }

    @Transactional
    public FieldDefinition update(
            String sourceInstance,
            long id,
            CreateFieldDefinitionCommand command,
            String actor) {
        String normalizedSource = requireText(sourceInstance, "sourceInstance");
        FieldDefinition existing = repository.findById(normalizedSource, id)
                .orElseThrow(() -> new com.fanrui.qms.instrumentextension.domain.DomainNotFoundException(
                        "field definition not found: " + id));
        String normalizedKey = FieldDefinition.normalizeKey(command.fieldKey());
        if (repository.existsEnabledKey(normalizedSource, normalizedKey, id)) {
            throw new DomainConflictException("fieldKey already exists: " + normalizedKey);
        }
        FieldDefinition updated = new FieldDefinition(
                existing.id(), existing.sourceInstance(), existing.slotNumber(), normalizedKey,
                command.label(), command.fieldType(), command.selectOptions(), command.required(), existing.enabled(),
                existing.createdAt(), clock.instant(), existing.createdBy(), actor);
        return repository.update(updated);
    }

    @Transactional
    public void disable(String sourceInstance, long id, String actor) {
        String normalizedSource = requireText(sourceInstance, "sourceInstance");
        FieldDefinition existing = repository.findById(normalizedSource, id)
                .orElseThrow(() -> new com.fanrui.qms.instrumentextension.domain.DomainNotFoundException(
                        "field definition not found: " + id));
        repository.update(new FieldDefinition(
                existing.id(), existing.sourceInstance(), existing.slotNumber(), existing.fieldKey(),
                existing.label(), existing.fieldType(), existing.selectOptions(), existing.required(), false,
                existing.createdAt(), clock.instant(), existing.createdBy(), actor));
    }

    private static String requireText(String value, String name) {
        if (value == null || value.isBlank()) {
            throw new DomainValidationException(name + " must not be blank");
        }
        return value.trim();
    }
}
