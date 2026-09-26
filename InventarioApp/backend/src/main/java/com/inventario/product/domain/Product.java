package com.inventario.product.domain;

import com.inventario.shared.domain.BusinessRuleException;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
public class Product {
    private final Long id;
    private final String nombre;
    private final String descripcion;
    private final Integer cantidad;
    private final BigDecimal precio;
    private final LocalDateTime fechaCreacion;
    private final LocalDateTime fechaActualizacion;

     @Builder
    private Product(
        Long id, 
        String nombre, 
        String descripcion, 
        Integer cantidad, 
        BigDecimal precio,
        LocalDateTime fechaCreacion, 
        LocalDateTime fechaActualizacion) {
        if (nombre == null || nombre.trim().isEmpty()) {
            throw new BusinessRuleException("El nombre del producto es obligatorio");
        }
        if (cantidad == null || cantidad < 0) {
            throw new BusinessRuleException("La cantidad no puede ser negativa");
        }
        if (precio == null || precio.signum() < 0) {
            throw new BusinessRuleException("El precio no puede ser negativo");
        }
        this.id = id;
        this.nombre = nombre.trim();
        this.descripcion = descripcion == null ? null : descripcion.trim();
        this.cantidad = cantidad;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }
}