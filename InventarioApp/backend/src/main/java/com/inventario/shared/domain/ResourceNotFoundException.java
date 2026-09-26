package com.inventario.shared.domain;

/** Se traduce a HTTP 404. */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String recurso, Object id) {
        super(recurso + " con id " + id + " no existe");
    }
}
