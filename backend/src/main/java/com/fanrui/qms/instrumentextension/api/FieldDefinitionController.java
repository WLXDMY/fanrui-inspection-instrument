package com.fanrui.qms.instrumentextension.api;

import com.fanrui.qms.instrumentextension.application.FieldDefinitionService;
import com.fanrui.qms.instrumentextension.domain.CreateFieldDefinitionCommand;
import com.fanrui.qms.instrumentextension.domain.FieldDefinition;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/field-definitions")
public class FieldDefinitionController {
    private final FieldDefinitionService service;
    private final String sourceInstance;

    public FieldDefinitionController(
            FieldDefinitionService service,
            @Value("${app.source-instance}") String sourceInstance) {
        this.service = service;
        this.sourceInstance = sourceInstance;
    }

    @GetMapping
    public List<FieldDefinition> list(
            @RequestParam(defaultValue = "false") boolean includeDisabled) {
        return service.list(sourceInstance, includeDisabled);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FieldDefinition create(
            @Valid @RequestBody CreateFieldDefinitionRequest request,
            Authentication authentication,
            @RequestHeader(value = "X-Actor", required = false) String fallbackActor) {
        String actor = authentication != null ? authentication.getName()
                : fallbackActor == null || fallbackActor.isBlank() ? "local-development" : fallbackActor.trim();
        return service.create(sourceInstance, request.toCommand(), actor);
    }

    @PutMapping("/{id}")
    public FieldDefinition update(
            @PathVariable long id,
            @Valid @RequestBody CreateFieldDefinitionRequest request,
            Authentication authentication,
            @RequestHeader(value = "X-Actor", required = false) String fallbackActor) {
        return service.update(sourceInstance, id, request.toCommand(), actor(authentication, fallbackActor));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void disable(
            @PathVariable long id,
            Authentication authentication,
            @RequestHeader(value = "X-Actor", required = false) String fallbackActor) {
        service.disable(sourceInstance, id, actor(authentication, fallbackActor));
    }

    private static String actor(Authentication authentication, String fallbackActor) {
        return authentication != null ? authentication.getName()
                : fallbackActor == null || fallbackActor.isBlank() ? "local-development" : fallbackActor.trim();
    }

    public record CreateFieldDefinitionRequest(
            @NotBlank String label,
            @NotBlank String fieldKey,
            @NotNull com.fanrui.qms.instrumentextension.domain.FieldType fieldType,
            boolean required,
            List<String> selectOptions) {
        CreateFieldDefinitionCommand toCommand() {
            return new CreateFieldDefinitionCommand(label, fieldKey, fieldType, required, selectOptions);
        }
    }
}
