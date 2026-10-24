package com.fanrui.qms.instrumentextension.domain;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

class BindingSnapshotTest {

    @Test
    void changing_instrument_code_keeps_the_same_source_identity() {
        BindingSnapshot original = new BindingSnapshot(
                new BindingIdentity("fanrui-main", "1"),
                "FR0001-1",
                "内径千分尺",
                "ENABLED",
                Instant.parse("2026-08-28T10:00:00Z"));

        BindingSnapshot updated = original.synchronize(
                "FR0001-NEW",
                "内径千分尺（已校准）",
                "ENABLED",
                Instant.parse("2026-08-28T11:00:00Z"));

        assertThat(updated.identity()).isEqualTo(original.identity());
        assertThat(updated.instrumentCode()).isEqualTo("FR0001-NEW");
        assertThat(updated.instrumentName()).isEqualTo("内径千分尺（已校准）");
    }
}
