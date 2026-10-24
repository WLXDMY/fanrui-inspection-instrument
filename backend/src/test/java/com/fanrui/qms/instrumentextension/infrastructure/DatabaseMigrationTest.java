package com.fanrui.qms.instrumentextension.infrastructure;

import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import static org.assertj.core.api.Assertions.assertThat;

class DatabaseMigrationTest {
    @Test
    void creates_only_the_four_owned_business_tables() throws Exception {
        String url = "jdbc:h2:mem:extension_migration;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1";
        Flyway.configure().dataSource(url, "sa", "").load().migrate();

        try (Connection connection = DriverManager.getConnection(url, "sa", "");
             Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery("""
                     select count(*)
                     from information_schema.tables
                     where table_schema = 'public'
                       and table_name in (
                         'instrument_binding',
                         'instrument_field_definition',
                         'instrument_field_value',
                         'instrument_extension_audit_log')
                     """)) {
            result.next();
            assertThat(result.getInt(1)).isEqualTo(4);
        }

        try (Connection connection = DriverManager.getConnection(url, "sa", "");
             Statement statement = connection.createStatement();
             ResultSet result = statement.executeQuery("""
                     select count(*)
                     from information_schema.columns
                     where table_schema = 'public'
                       and table_name = 'instrument_field_definition'
                       and column_name = 'select_options'
                     """)) {
            result.next();
            assertThat(result.getInt(1)).isEqualTo(1);
        }
    }
}
