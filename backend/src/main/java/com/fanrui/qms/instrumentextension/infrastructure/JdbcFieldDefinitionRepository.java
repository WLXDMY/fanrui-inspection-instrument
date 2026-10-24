package com.fanrui.qms.instrumentextension.infrastructure;

import com.fanrui.qms.instrumentextension.domain.FieldDefinition;
import com.fanrui.qms.instrumentextension.domain.FieldDefinitionRepository;
import com.fanrui.qms.instrumentextension.domain.FieldType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Arrays;

@Repository
public class JdbcFieldDefinitionRepository implements FieldDefinitionRepository {
    private static final RowMapper<FieldDefinition> ROW_MAPPER = (result, rowNum) -> new FieldDefinition(
            result.getLong("id"),
            result.getString("source_instance"),
            result.getInt("slot_number"),
            result.getString("field_key"),
            result.getString("field_label"),
            FieldType.valueOf(result.getString("field_type")),
            parseSelectOptions(result.getString("select_options")),
            result.getBoolean("required_flag"),
            result.getBoolean("enabled_flag"),
            result.getTimestamp("created_at").toInstant(),
            result.getTimestamp("updated_at").toInstant(),
            result.getString("created_by"),
            result.getString("updated_by"));

    private final JdbcTemplate jdbcTemplate;

    public JdbcFieldDefinitionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Set<Integer> findOccupiedSlots(String sourceInstance) {
        return new HashSet<>(jdbcTemplate.queryForList(
                "select slot_number from instrument_field_definition where source_instance = ?",
                Integer.class,
                sourceInstance));
    }

    @Override
    public boolean existsEnabledKey(String sourceInstance, String fieldKey, Long excludedId) {
        String sql = "select count(*) from instrument_field_definition "
                + "where source_instance = ? and field_key = ?"
                + (excludedId == null ? "" : " and id <> ?");
        Integer count = excludedId == null
                ? jdbcTemplate.queryForObject(sql, Integer.class, sourceInstance, fieldKey)
                : jdbcTemplate.queryForObject(sql, Integer.class, sourceInstance, fieldKey, excludedId);
        return count != null && count > 0;
    }

    @Override
    public FieldDefinition insert(FieldDefinition definition) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement("""
                    insert into instrument_field_definition (
                      source_instance, slot_number, field_key, field_label, field_type, select_options,
                      required_flag, enabled_flag, created_at, updated_at, created_by, updated_by)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, definition.sourceInstance());
            statement.setInt(2, definition.slotNumber());
            statement.setString(3, definition.fieldKey());
            statement.setString(4, definition.label());
            statement.setString(5, definition.fieldType().name());
            statement.setString(6, serializeSelectOptions(definition.selectOptions()));
            statement.setBoolean(7, definition.required());
            statement.setBoolean(8, definition.enabled());
            statement.setTimestamp(9, Timestamp.from(definition.createdAt()));
            statement.setTimestamp(10, Timestamp.from(definition.updatedAt()));
            statement.setString(11, definition.createdBy());
            statement.setString(12, definition.updatedBy());
            return statement;
        }, keyHolder);
        Number key = keyHolder.getKeys() == null ? null : (Number) keyHolder.getKeys().get("id");
        return new FieldDefinition(
                key == null ? null : key.longValue(), definition.sourceInstance(), definition.slotNumber(),
                definition.fieldKey(), definition.label(), definition.fieldType(), definition.selectOptions(), definition.required(),
                definition.enabled(), definition.createdAt(), definition.updatedAt(),
                definition.createdBy(), definition.updatedBy());
    }

    @Override
    public FieldDefinition update(FieldDefinition definition) {
        jdbcTemplate.update("""
                        update instrument_field_definition
                        set field_key = ?, field_label = ?, field_type = ?, select_options = ?, required_flag = ?,
                            enabled_flag = ?, updated_at = ?, updated_by = ?, version_no = version_no + 1
                        where id = ? and source_instance = ?
                        """,
                definition.fieldKey(), definition.label(), definition.fieldType().name(),
                serializeSelectOptions(definition.selectOptions()), definition.required(), definition.enabled(), Timestamp.from(definition.updatedAt()),
                definition.updatedBy(), definition.id(), definition.sourceInstance());
        return definition;
    }

    @Override
    public Optional<FieldDefinition> findById(String sourceInstance, long id) {
        return jdbcTemplate.query(
                        "select * from instrument_field_definition where source_instance = ? and id = ?",
                        ROW_MAPPER, sourceInstance, id)
                .stream().findFirst();
    }

    @Override
    public List<FieldDefinition> findAll(String sourceInstance, boolean includeDisabled) {
        String sql = "select * from instrument_field_definition where source_instance = ?"
                + (includeDisabled ? "" : " and enabled_flag = true")
                + " order by slot_number";
        return jdbcTemplate.query(sql, ROW_MAPPER, sourceInstance);
    }

    private static List<String> parseSelectOptions(String value) {
        if (value == null || value.isBlank()) {
            return List.of();
        }
        return Arrays.stream(value.split("\\R"))
                .map(String::trim)
                .filter(item -> !item.isEmpty())
                .toList();
    }

    private static String serializeSelectOptions(List<String> selectOptions) {
        if (selectOptions == null || selectOptions.isEmpty()) {
            return null;
        }
        return selectOptions.stream().collect(Collectors.joining("\n"));
    }
}
