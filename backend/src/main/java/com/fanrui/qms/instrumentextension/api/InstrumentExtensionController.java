package com.fanrui.qms.instrumentextension.api;

import com.fanrui.qms.instrumentextension.application.InstrumentExtensionService;
import com.fanrui.qms.instrumentextension.domain.InstrumentBinding;
import com.fanrui.qms.instrumentextension.domain.InstrumentExtensionView;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/instruments")
public class InstrumentExtensionController {
    private final InstrumentExtensionService service;
    private final String sourceInstance;

    public InstrumentExtensionController(
            InstrumentExtensionService service,
            @Value("${app.source-instance}") String sourceInstance) {
        this.service = service;
        this.sourceInstance = sourceInstance;
    }

    @PostMapping("/{sourceInstrumentId}/sync")
    public InstrumentBinding synchronize(
            @PathVariable String sourceInstrumentId,
            @RequestHeader(value = "Authorization", required = false) String authorization,
            @RequestHeader(value = "X-Actor", required = false) String fallbackActor,
            Authentication authentication) {
        return service.synchronize(
                sourceInstance, sourceInstrumentId, authorization, actor(authentication, fallbackActor));
    }

    @GetMapping("/{sourceInstrumentId}/extension")
    public InstrumentExtensionView get(@PathVariable String sourceInstrumentId) {
        return service.get(sourceInstance, sourceInstrumentId);
    }

    @PutMapping("/{sourceInstrumentId}/extension")
    public InstrumentExtensionView save(
            @PathVariable String sourceInstrumentId,
            @Valid @RequestBody SaveValuesRequest request,
            @RequestHeader(value = "X-Actor", required = false) String fallbackActor,
            Authentication authentication) {
        return service.save(
                sourceInstance, sourceInstrumentId, request.values(), request.idempotencyKey(),
                actor(authentication, fallbackActor));
    }

    private static String actor(Authentication authentication, String fallbackActor) {
        if (authentication != null) {
            return authentication.getName();
        }
        return fallbackActor == null || fallbackActor.isBlank() ? "local-development" : fallbackActor.trim();
    }

    public record SaveValuesRequest(
            @NotNull Map<Long, String> values,
            String idempotencyKey) {
    }
}
