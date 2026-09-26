package com.inventario.shared.infrastructure.persistence;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public abstract class BaseSpRepository {
    protected final JdbcTemplate jdbcTemplate;

    protected BaseSpRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    protected <T> List<T> callForList(String procedure, Map<String, Object> params, RowMapper<T> mapper) {
        return jdbcTemplate.query(buildExec(procedure, params), mapper, params.values().toArray());
    }

    protected <T> Optional<T> callForOptional(String procedure, Map<String, Object> params, RowMapper<T> mapper) {
        return callForList(procedure, params, mapper).stream().findFirst();
    }

    protected <T> T callForScalar(String procedure, Map<String, Object> params, Class<T> type) {
        return jdbcTemplate.queryForObject(buildExec(procedure, params), type, params.values().toArray());
    }

    protected static Map<String, Object> params(Object... keyValues) {
        Map<String, Object> map = new LinkedHashMap<>();
        for (int i = 0; i < keyValues.length; i += 2) {
            map.put((String) keyValues[i], keyValues[i + 1]);
        }
        return map;
    }

    private static String buildExec(String procedure, Map<String, Object> params) {
        String args = params.keySet().stream()
                .map(name -> "@" + name + " = ?")
                .collect(Collectors.joining(", "));
        return "EXEC " + procedure + (args.isEmpty() ? "" : " " + args);
    }
}
