package com.fanrui.qms.instrumentextension.infrastructure;

import com.fanrui.qms.instrumentextension.domain.InstrumentFieldValue;
import com.fanrui.qms.instrumentextension.domain.InstrumentFieldValueRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;

@Repository
public class JdbcInstrumentFieldValueRepository implements InstrumentFieldValueRepository {
    private static final RowMapper<InstrumentFieldValue> ROW_MAPPER = (result, rowNum) -> {
        Date date = result.getDate("date_value");
        Timestamp dateTime = result.getTimestamp("datetime_value");
        return new InstrumentFieldValue(
                result.getLong("id"), result.getLong("binding_id"), result.getLong("field_definition_id"),
                result.getString("text_value"), result.getBigDecimal("number_value"),
                date == null ? null : date.toLocalDate(), dateTime == null ? null : dateTime.toLocalDateTime(),
                result.getString("idempotency_key"), result.getTimestamp("created_at").toInstant(),
                result.getTimestamp("updated_at").toInstant(), result.getString("created_by"),
                result.getString("updated_by"));
    };

    private final JdbcTemplate jdbcTemplate;

    public JdbcInstrumentFieldValueRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<InstrumentFieldValue> findByBindingId(long bindingId) {
        return jdbcTemplate.query(
                "select * from instrument_field_value where binding_id = ? order by field_definition_id",
                ROW_MAPPER, bindingId);
    }

    @Override
    public InstrumentFieldValue upsert(InstrumentFieldValue value) {
        List<InstrumentFieldValue> existing = jdbcTemplate.query("""
                        select * from instrument_field_value
                        where binding_id = ? and field_definition_id = ?
                        """, ROW_MAPPER, value.bindingId(), value.fieldDefinitionId());
        if (!existing.isEmpty()) {
            InstrumentFieldValue old = existing.getFirst();
            jdbcTemplate.update("""
                            update instrument_field_value
                            set text_value = ?, number_value = ?, date_value = ?, datetime_value = ?,
                                idempotency_key = ?, updated_at = ?, updated_by = ?, version_no = version_no + 1
                            where id = ?
                            """,
                    value.textValue(), value.numberValue(), value.dateValue(), value.dateTimeValue(),
                    value.idempotencyKey(), Timestamp.from(value.updatedAt()), value.updatedBy(), old.id());
            return new InstrumentFieldValue(
                    old.id(), value.bindingId(), value.fieldDefinitionId(), value.textValue(),
                    value.numberValue(), value.dateValue(), value.dateTimeValue(), value.idempotencyKey(),
                    old.createdAt(), value.updatedAt(), old.createdBy(), value.updatedBy());
        }

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement("""
                    insert into instrument_field_value (
                      binding_id, field_definition_id, text_value, number_value, date_value, datetime_value,
                      idempotency_key, created_at, updated_at, created_by, updated_by)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, Statement.RETURN_GENERATED_KEYS);
            statement.setLong(1, value.bindingId());
            statement.setLong(2, value.fieldDefinitionId());
            statement.setString(3, value.textValue());
            statement.setBigDecimal(4, value.numberValue());
            statement.setObject(5, value.dateValue());
            statement.setObject(6, value.dateTimeValue());
            statement.setString(7, value.idempotencyKey());
            statement.setTimestamp(8, Timestamp.from(value.createdAt()));
            statement.setTimestamp(9, Timestamp.from(value.updatedAt()));
            statement.setString(10, value.createdBy());
            statement.setString(11, value.updatedBy());
            return statement;
        }, keyHolder);
        Number key = keyHolder.getKeys() == null ? null : (Number) keyHolder.getKeys().get("id");
        return new InstrumentFieldValue(
                key == null ? null : key.longValue(), value.bindingId(), value.fieldDefinitionId(),
                value.textValue(), value.numberValue(), value.dateValue(), value.dateTimeValue(),
                value.idempotencyKey(), value.createdAt(), value.updatedAt(), value.createdBy(), value.updatedBy());
    }
}
