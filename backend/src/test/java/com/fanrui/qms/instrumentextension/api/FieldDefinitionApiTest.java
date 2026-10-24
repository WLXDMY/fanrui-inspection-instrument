package com.fanrui.qms.instrumentextension.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "app.security.enabled=false",
        "app.source-instance=fanrui-main",
        "spring.datasource.url=jdbc:h2:mem:field_api;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1",
        "spring.datasource.username=sa",
        "spring.datasource.password=",
        "spring.datasource.driver-class-name=org.h2.Driver"
})
@AutoConfigureMockMvc
@Transactional
class FieldDefinitionApiTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void creates_and_reads_a_global_field_definition() throws Exception {
        MvcResult created = mockMvc.perform(post("/api/v1/field-definitions")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "label": "检测周期",
                                  "fieldKey": "inspection_cycle",
                                  "fieldType": "DATE",
                                  "required": false
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.slotNumber").value(1))
                .andExpect(jsonPath("$.label").value("检测周期"))
                .andReturn();
        long fieldId = objectMapper.readTree(created.getResponse().getContentAsString()).get("id").asLong();

        mockMvc.perform(get("/api/v1/field-definitions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fieldKey").value("inspection_cycle"));

        mockMvc.perform(put("/api/v1/field-definitions/{id}", fieldId)
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"label":"下次到达时间","fieldKey":"next_due_at","fieldType":"DATETIME","required":true}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fieldKey").value("next_due_at"));

        mockMvc.perform(delete("/api/v1/field-definitions/{id}", fieldId)
                        .header("X-Actor", "zhouj"))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/v1/field-definitions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void creates_a_select_definition_with_customer_configured_options() throws Exception {
        mockMvc.perform(post("/api/v1/field-definitions")
                        .header("X-Actor", "zhouj")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "label": "检验有效期天数",
                                  "fieldKey": "inspection_valid_days",
                                  "fieldType": "TEXT",
                                  "selectOptions": ["30", "90", "180", "365"],
                                  "required": false
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.fieldType").value("TEXT"))
                .andExpect(jsonPath("$.selectOptions[0]").value("30"))
                .andExpect(jsonPath("$.selectOptions[3]").value("365"));
    }
}
