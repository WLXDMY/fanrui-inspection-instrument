package com.fanrui.qms.instrumentextension.integration;

import com.fasterxml.jackson.databind.JsonNode;
import com.fanrui.qms.instrumentextension.domain.DomainValidationException;
import com.fanrui.qms.instrumentextension.domain.SourceInstrumentSnapshot;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class FanruiInstrumentSourceClient implements InstrumentSourceClient {
    private final RestClient restClient;
    private final String baseUrl;

    public FanruiInstrumentSourceClient(
            RestClient.Builder builder,
            @Value("${fanrui.base-url}") String baseUrl) {
        this.restClient = builder.build();
        this.baseUrl = baseUrl.replaceAll("/+$", "");
    }

    @Override
    public SourceInstrumentSnapshot fetch(String sourceInstrumentId, String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new DomainValidationException("Fanrui Authorization bearer token is required");
        }
        JsonNode response = restClient.get()
                .uri(baseUrl + "/qms/product/v1/instrument/detail/{id}", sourceInstrumentId)
                .header(HttpHeaders.AUTHORIZATION, authorizationHeader)
                .retrieve()
                .body(JsonNode.class);
        JsonNode data = response == null ? null : response.path("data");
        if (data == null || data.isMissingNode() || data.isNull()) {
            throw new DomainValidationException("Fanrui instrument detail response has no data");
        }
        String code = firstText(data, "instrumentCode", "code", "instrumentNo");
        String name = firstText(data, "instrumentName", "name");
        String status = firstText(data, "statusName", "status", "enableStatus");
        if (status == null) {
            status = data.path("enabled").asBoolean(true) ? "ENABLED" : "DISABLED";
        }
        return new SourceInstrumentSnapshot(code, name, status);
    }

    private static String firstText(JsonNode node, String... names) {
        for (String name : names) {
            JsonNode value = node.path(name);
            if (!value.isMissingNode() && !value.isNull() && !value.asText().isBlank()) {
                return value.asText();
            }
        }
        return null;
    }
}
