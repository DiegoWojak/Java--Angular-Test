package com.inventario.auth.infrastructure;

import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.inventario.auth.domain.Usuario;
import com.inventario.auth.domain.UsuarioRepository;
import com.inventario.shared.infrastructure.persistence.BaseSpRepository;

/* Implementación sigueindo JdbcTemplate en su constructor */
/** Implementación de {@link UsuarioRepository} con dbo.sp_usuario_por_username. */
@Repository 
public class UsuarioSpRepository extends BaseSpRepository implements UsuarioRepository {
    
    private static final RowMapper<Usuario> MAPPER = (rs, i) -> Usuario.builder()
            .id(rs.getLong("id"))
            .username(rs.getString("username"))
            .passwordHash(rs.getString("password_hash"))
            .rol(rs.getString("rol"))
            .activo(rs.getBoolean("activo"))
            .build();

    public UsuarioSpRepository(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return callForOptional("dbo.sp_usuario_por_username", params("username", username), MAPPER);
    }        
}
