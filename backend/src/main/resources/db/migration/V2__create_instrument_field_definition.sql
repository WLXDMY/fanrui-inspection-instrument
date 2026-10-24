CREATE TABLE instrument_field_definition (
    id BIGINT NOT NULL AUTO_INCREMENT,
    source_instance VARCHAR(64) NOT NULL,
    slot_number INT NOT NULL,
    field_key VARCHAR(64) NOT NULL,
    field_label VARCHAR(128) NOT NULL,
    field_type VARCHAR(16) NOT NULL,
    required_flag BOOLEAN NOT NULL DEFAULT FALSE,
    enabled_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) NOT NULL,
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL,
    version_no INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT uk_field_source_slot UNIQUE (source_instance, slot_number),
    CONSTRAINT uk_field_source_key UNIQUE (source_instance, field_key),
    CONSTRAINT ck_field_slot CHECK (slot_number BETWEEN 1 AND 10),
    CONSTRAINT ck_field_type CHECK (field_type IN ('TEXT', 'NUMBER', 'DATE', 'DATETIME'))
);

CREATE INDEX idx_field_source_enabled
    ON instrument_field_definition (source_instance, enabled_flag, slot_number);
