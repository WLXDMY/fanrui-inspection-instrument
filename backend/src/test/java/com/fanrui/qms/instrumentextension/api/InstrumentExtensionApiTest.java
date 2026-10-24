package com.fanrui.qms.instrumentextension.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fanrui.qms.instrumentextension.domain.SourceInstrumentSnapshot;
import com.fanrui.qms.instrumentextension.integration.InstrumentSourceClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "app.security.enabled=false",
        "app.source-instance=fanrui-main",
        "spring.datasource.url=jdbc:h2:mem:instrument_api;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.datasource.driver-class-name=org.h2.Driver"
})
@AutoConfigureMockMvc
@Transactional
class InstrumentExtensionApiTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private InstrumentSourceClient sourceClient;

    @Test
    void synchronizes_real_source_identity_and_saves_typed_extension_value() throws Exception {
        MvcResult created = mockMvc.perform(post("/api/v1/field-definitions")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"label":"检测周期","fieldKey":"inspection_cycle","fieldType":"DATE","required":false}
                                """))
                .andExpect(status().isCreated())
                .andReturn();
        long fieldId = objectMapper.readTree(created.getResponse().getContentAsString()).get("id").asLong();

        when(sourceClient.fetch("1", "Bearer source-token"))
                .thenReturn(new SourceInstrumentSnapshot("FR0001-1", "内径千分尺", "ENABLED"));

        mockMvc.perform(post("/api/v1/instruments/1/sync")
                        .header("Authorization", "Bearer source-token")
                        .header("X-Actor", "zhouj"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.identity.sourceInstrumentId").value("1"))
                .andExpect(jsonPath("$.instrumentCode").value("FR0001-1"));
        verify(sourceClient).fetch("1", "Bearer source-token");

        mockMvc.perform(put("/api/v1/instruments/1/extension")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"values":{"%d":"2027-08-28"},"idempotencyKey":"test-save-001"}
                                """.formatted(fieldId)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/v1/instruments/1/extension"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.binding.identity.sourceInstrumentId").value("1"))
                .andExpect(jsonPath("$.fields[0].fieldKey").value("inspection_cycle"))
                .andExpect(jsonPath("$.values[0].dateValue").value("2027-08-28"));
    }

    @Test
    void saves_only_a_value_present_in_the_configured_dropdown_options() throws Exception {
        MvcResult created = mockMvc.perform(post("/api/v1/field-definitions")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"label":"检验有效期天数","fieldKey":"valid_days","fieldType":"TEXT",
                                 "selectOptions":["30","90","180","365"],"required":false}
                                """))
                .andExpect(status().isCreated())
                .andReturn();
        long fieldId = objectMapper.readTree(created.getResponse().getContentAsString()).get("id").asLong();

        when(sourceClient.fetch("day-select-instrument", "Bearer source-token"))
                .thenReturn(new SourceInstrumentSnapshot("FR-DAY", "有效期测试仪器", "ENABLED"));
        mockMvc.perform(post("/api/v1/instruments/day-select-instrument/sync")
                        .header("Authorization", "Bearer source-token")
                        .header("X-Actor", "zhouj"))
                .andExpect(status().isOk());

        mockMvc.perform(put("/api/v1/instruments/day-select-instrument/extension")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"values":{"%d":"180"},"idempotencyKey":"day-select-save-001"}
                                """.formatted(fieldId)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.values[0].textValue").value("180"));

        mockMvc.perform(put("/api/v1/instruments/day-select-instrument/extension")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"values":{"%d":"3650"},"idempotencyKey":"day-select-save-002"}
                                """.formatted(fieldId)))
                .andExpect(status().isBadRequest());
    }
}
