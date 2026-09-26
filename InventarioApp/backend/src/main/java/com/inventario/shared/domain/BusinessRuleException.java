package com.inventario.shared.domain;

/** Violación de una regla de negocio del dominio. Return HTTP 400. */
public class BusinessRuleException extends RuntimeException {

    public BusinessRuleException(String message) {
        super(message);
    }
}
