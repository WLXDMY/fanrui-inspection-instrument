package com.fanrui.qms.instrumentextension.application;

import com.fanrui.qms.instrumentextension.domain.BindingIdentity;
import com.fanrui.qms.instrumentextension.domain.DomainNotFoundException;
import com.fanrui.qms.instrumentextension.domain.DomainValidationException;
import com.fanrui.qms.instrumentextension.domain.FieldDefinition;
import com.fanrui.qms.instrumentextension.domain.FieldDefinitionRepository;
import com.fanrui.qms.instrumentextension.domain.FieldDefinitionRules;
import com.fanrui.qms.instrumentextension.domain.InstrumentBinding;
import com.fanrui.qms.instrumentextension.domain.InstrumentBindingRepository;
import com.fanrui.qms.instrumentextension.domain.InstrumentExtensionView;
import com.fanrui.qms.instrumentextension.domain.InstrumentFieldValue;
import com.fanrui.qms.instrumentextension.domain.InstrumentFieldValueRepository;
import com.fanrui.qms.instrumentextension.integration.InstrumentSourceClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InstrumentExtensionService {
    private final InstrumentBindingService bindingService;
    private final InstrumentBindingRepository bindingRepository;
    private final FieldDefinitionRepository fieldRepository;
    private final InstrumentFieldValueRepository valueRepository;
    private final InstrumentSourceClient sourceClient;
    private final Clock clock;

    public InstrumentExtensionService(
            InstrumentBindingService bindingService,
            InstrumentBindingRepository bindingRepository,
            FieldDefinitionRepository fieldRepository,
            InstrumentFieldValueRepository valueRepository,
            InstrumentSourceClient sourceClient,
            Clock clock) {
        this.bindingService = bindingService;
        this.bindingRepository = bindingRepository;
        this.fieldRepository = fieldRepository;
        this.valueRepository = valueRepository;
        this.sourceClient = sourceClient;
        this.clock = clock;
    }

    @Transactional
    public InstrumentBinding synchronize(
            String sourceInstance,
            String sourceInstrumentId,
            String authorizationHeader,
            String actor) {
        BindingIdentity identity = new BindingIdentity(sourceInstance, sourceInstrumentId);
        return bindingService.synchronize(identity, sourceClient.fetch(sourceInstrumentId, authorizationHeader), actor);
    }

    @Transactional(readOnly = true)
    public InstrumentExtensionView get(String sourceInstance, String sourceInstrumentId) {
        InstrumentBinding binding = requireBinding(sourceInstance, sourceInstrumentId);
        return new InstrumentExtensionView(
                binding,
                fieldRepository.findAll(sourceInstance, false),
                valueRepository.findByBindingId(binding.id()));
    }

    @Transactional
    public InstrumentExtensionView save(
            String sourceInstance,
            String sourceInstrumentId,
            Map<Long, String> rawValues,
            String idempotencyKey,
            String actor) {
        InstrumentBinding binding = requireBinding(sourceInstance, sourceInstrumentId);
        List<FieldDefinition> definitions = fieldRepository.findAll(sourceInstance, false);
        Map<Long, FieldDefinition> byId = new HashMap<>();
        definitions.forEach(definition -> byId.put(definition.id(), definition));
        Instant now = clock.instant();
        for (Map.Entry<Long, String> entry : rawValues.entrySet()) {
            FieldDefinition definition = byId.get(entry.getKey());
            if (definition == null) {
                throw new DomainValidationException("unknown or disabled field definition: " + entry.getKey());
            }
            InstrumentFieldValue value = InstrumentFieldValue.create(
                    binding.id(), definition.id(),
                    FieldDefinitionRules.normalizeConfiguredValue(definition, entry.getValue()),
                    idempotencyKey, now, actor);
            valueRepository.upsert(value);
        }
        return get(sourceInstance, sourceInstrumentId);
    }

    private InstrumentBinding requireBinding(String sourceInstance, String sourceInstrumentId) {
        return bindingRepository.findByIdentity(new BindingIdentity(sourceInstance, sourceInstrumentId))
                .orElseThrow(() -> new DomainNotFoundException(
                        "instrument has not been synchronized: " + sourceInstrumentId));
    }
}
