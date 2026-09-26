package com.inventario.auth.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private final String token;
    private final String tipo;
    private final long expiraEnMs;
    private final String username;
    private final String rol;
}
