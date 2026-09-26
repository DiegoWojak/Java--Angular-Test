package com.inventario.shared.domain;

import java.util.Optional;

/**
 * Las implementaciones de la capa de infraestructura.
 *
 * @param <T>  entidad de dominio
 * @param <ID> tipo del identificador
 */
public interface BaseRepository<T, ID> {

    Optional<T> findById(ID id);

    T insert(T entity);

    Optional<T> update(ID id, T entity);

    boolean deleteById(ID id);
}
