CREATE TABLE instrument_binding (
    id BIGINT NOT NULL AUTO_INCREMENT,
    source_instance VARCHAR(64) NOT NULL,
    source_instrument_id VARCHAR(128) NOT NULL,
    instrument_code VARCHAR(128) NOT NULL,
    instrument_name VARCHAR(255) NOT NULL,
    instrument_status VARCHAR(32) NOT NULL,
    synchronized_at TIMESTAMP(6) NOT NULL,
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    created_by VARCHAR(128) NOT NULL,
    updated_by VARCHAR(128) NOT NULL,
    version_no INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT uk_binding_source_id UNIQUE (source_instance, source_instrument_id),
    CONSTRAINT uk_binding_source_code UNIQUE (source_instance, instrument_code)
);

CREATE INDEX idx_binding_name ON instrument_binding (source_instance, instrument_name);
