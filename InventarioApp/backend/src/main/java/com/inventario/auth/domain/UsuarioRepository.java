package com.inventario.auth.domain;

import java.util.Optional;

public interface UsuarioRepository {
    Optional<Usuario> findByUsername(String username);
}
