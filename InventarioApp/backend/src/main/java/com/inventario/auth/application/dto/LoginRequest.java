package com.inventario.auth.application.dto;

import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
public class LoginRequest {
    @Schema(example = "admin")
    @NotBlank(message = "El usuario es obligatorio")
    private String username;

    @Schema(example = "admin123")
    @NotBlank(message = "La contraseña es obligatoria")
    private String password;
}
