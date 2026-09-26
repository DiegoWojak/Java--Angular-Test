package com.inventario.shared.web;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter 
public class ApiError {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final int status;
    private final String error;
    private final String message;
    private final String path;
    private final List<CampoError> errores;

    public ApiError(int status, String error, String message, String path, List<CampoError> errores) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.errores = errores;
    }

    public ApiError(int status, String error, String message, String path) {
        this(status, error, message, path, null);
    }

    @Getter
    @AllArgsConstructor
    public static class CampoError {
        private final String campo;
        private final String mensaje;
    }
}


