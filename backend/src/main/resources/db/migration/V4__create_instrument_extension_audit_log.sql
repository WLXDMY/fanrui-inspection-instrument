CREATE TABLE instrument_extension_audit_log (
    id BIGINT NOT NULL AUTO_INCREMENT,
    source_instance VARCHAR(64) NOT NULL,
    source_instrument_id VARCHAR(128) NULL,
    binding_id BIGINT NULL,
    action_type VARCHAR(64) NOT NULL,
    object_type VARCHAR(64) NOT NULL,
    object_id VARCHAR(128) NULL,
    before_data TEXT NULL,
    after_data TEXT NULL,
    request_id VARCHAR(128) NULL,
    operated_at TIMESTAMP(6) NOT NULL,
    operated_by VARCHAR(128) NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX idx_audit_instrument
    ON instrument_extension_audit_log (source_instance, source_instrument_id, operated_at);
CREATE INDEX idx_audit_binding ON instrument_extension_audit_log (binding_id, operated_at);
