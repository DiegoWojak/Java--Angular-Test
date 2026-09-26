package com.inventario.product.application.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class ProductResponse {

    private final Long id;
    private final String nombre;
    private final String descripcion;
    private final Integer cantidad;
    private final BigDecimal precio;
    private final LocalDateTime fechaCreacion;
    private final LocalDateTime fechaActualizacion;
}
