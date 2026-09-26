package com.inventario.shared.application;

import com.inventario.shared.domain.BaseRepository;
import com.inventario.shared.domain.ResourceNotFoundException;

/**
 * Servicio base con el flujo CRUD común: convertir DTO → dominio, delegar al repositorio,
 *
 * @param <T>   entidad de dominio
 * @param <ID>  tipo del identificador
 * @param <REQ> DTO de entrada
 * @param <RES> DTO de salida
 */
public abstract class BaseCrudService<T, ID, REQ, RES> {

    protected final BaseRepository<T, ID> repository;

    protected BaseCrudService(BaseRepository<T, ID> repository) {
        this.repository = repository;
    }

    protected abstract String resourceName();

    protected abstract T toDomain(REQ request);

    protected abstract RES toResponse(T entity);

    public RES obtener(ID id) {
        return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName(), id));
    }

    public RES crear(REQ request) {
        return toResponse(repository.insert(toDomain(request)));
    }

    public RES actualizar(ID id, REQ request) {
        return repository.update(id, toDomain(request))
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException(resourceName(), id));
    }

    public void eliminar(ID id) {
        if (!repository.deleteById(id)) {
            throw new ResourceNotFoundException(resourceName(), id);
        }
    }
}
