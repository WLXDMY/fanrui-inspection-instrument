package com.fanrui.qms.instrumentextension.infrastructure;

import com.fanrui.qms.instrumentextension.domain.BindingIdentity;
import com.fanrui.qms.instrumentextension.domain.InstrumentBinding;
import com.fanrui.qms.instrumentextension.domain.InstrumentBindingRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Optional;

@Repository
public class JdbcInstrumentBindingRepository implements InstrumentBindingRepository {
    private static final RowMapper<InstrumentBinding> ROW_MAPPER = (result, rowNum) -> new InstrumentBinding(
            result.getLong("id"),
            new BindingIdentity(result.getString("source_instance"), result.getString("source_instrument_id")),
            result.getString("instrument_code"), result.getString("instrument_name"),
            result.getString("instrument_status"), result.getTimestamp("synchronized_at").toInstant(),
            result.getString("created_by"), result.getString("updated_by"));

    private final JdbcTemplate jdbcTemplate;

    public JdbcInstrumentBindingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<InstrumentBinding> findByIdentity(BindingIdentity identity) {
        return jdbcTemplate.query("""
                        select * from instrument_binding
                        where source_instance = ? and source_instrument_id = ?
                        """, ROW_MAPPER, identity.sourceInstance(), identity.sourceInstrumentId())
                .stream().findFirst();
    }

    @Override
    public InstrumentBinding save(InstrumentBinding binding) {
        if (binding.id() != null) {
            jdbcTemplate.update("""
                            update instrument_binding
                            set instrument_code = ?, instrument_name = ?, instrument_status = ?,
                                synchronized_at = ?, updated_at = ?, updated_by = ?, version_no = version_no + 1
                            where id = ? and source_instance = ? and source_instrument_id = ?
                            """,
                    binding.instrumentCode(), binding.instrumentName(), binding.status(),
                    Timestamp.from(binding.synchronizedAt()), Timestamp.from(binding.synchronizedAt()),
                    binding.updatedBy(), binding.id(), binding.identity().sourceInstance(),
                    binding.identity().sourceInstrumentId());
            return binding;
        }
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement("""
                    insert into instrument_binding (
                      source_instance, source_instrument_id, instrument_code, instrument_name,
                      instrument_status, synchronized_at, created_at, updated_at, created_by, updated_by)
                    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, binding.identity().sourceInstance());
            statement.setString(2, binding.identity().sourceInstrumentId());
            statement.setString(3, binding.instrumentCode());
            statement.setString(4, binding.instrumentName());
            statement.setString(5, binding.status());
            Timestamp now = Timestamp.from(binding.synchronizedAt());
            statement.setTimestamp(6, now);
            statement.setTimestamp(7, now);
            statement.setTimestamp(8, now);
            statement.setString(9, binding.createdBy());
            statement.setString(10, binding.updatedBy());
            return statement;
        }, keyHolder);
        Number key = keyHolder.getKeys() == null ? null : (Number) keyHolder.getKeys().get("id");
        return new InstrumentBinding(
                key == null ? null : key.longValue(), binding.identity(), binding.instrumentCode(),
                binding.instrumentName(), binding.status(), binding.synchronizedAt(),
                binding.createdBy(), binding.updatedBy());
    }
}
