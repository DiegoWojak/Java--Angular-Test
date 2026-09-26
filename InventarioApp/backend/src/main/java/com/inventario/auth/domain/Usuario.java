package com.inventario.auth.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Usuario 
{
    private final Long id;
    private final String username;
    private final String passwordHash;
    private final String rol;
    private final boolean activo;
}
