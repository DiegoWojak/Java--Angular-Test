package com.inventario.product.domain;

import com.inventario.shared.domain.BaseRepository;

import java.util.List;

/** Puerto de persistencia de productos. */
public interface ProductRepository extends BaseRepository<Product, Long> {
    List<Product> buscar(String nombre);
}