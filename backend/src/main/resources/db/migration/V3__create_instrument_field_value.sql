CREATE TABLE instrument_field_value (
    id BIGINT NOT NULL AUTO_INCREMENT,
    binding_id BIGINT NOT NULL,
    field_definition_id BIGINT NOT NULL,
    text_value VARCHAR(2000) NULL,
    number_value DECIMAL(30, 10) NULL,
    date_value DATE NULL,
    datetime_value TIMESTAMP(6) NULL,
    idempotency_key VARCHAR(128) NULL,
    created_at TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL,
    version_no INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT uk_value_binding_field UNIQUE (binding_id, field_definition_id),
    CONSTRAINT fk_value_binding FOREIGN KEY (binding_id) REFERENCES instrument_binding (id),
    CONSTRAINT fk_value_definition FOREIGN KEY (field_definition_id) REFERENCES instrument_field_definition (id)
);

CREATE INDEX idx_value_definition ON instrument_field_value (field_definition_id);
CREATE INDEX idx_value_idempotency ON instrument_field_value (idempotency_key);
