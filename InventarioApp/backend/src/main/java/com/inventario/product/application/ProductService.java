package com.inventario.product.application;

import com.inventario.product.application.dto.ProductRequest;
import com.inventario.product.application.dto.ProductResponse;
import com.inventario.product.domain.Product;
import com.inventario.product.domain.ProductRepository;
import com.inventario.shared.application.BaseCrudService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService extends BaseCrudService<Product, Long, ProductRequest, ProductResponse>{
    private final ProductRepository productoRepository;

    public ProductService(ProductRepository productoRepository) {
        super(productoRepository);
        this.productoRepository = productoRepository;
    }

    public List<ProductResponse> listar(String nombre) {
        return productoRepository.buscar(nombre).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    protected String resourceName() {
        return "Producto";
    }

    @Override
    protected Product toDomain(ProductRequest r) {
        return Product.builder()
                .nombre(r.getNombre())
                .descripcion(r.getDescripcion())
                .cantidad(r.getCantidad())
                .precio(r.getPrecio())
                .build();
    }

    @Override
    protected ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .nombre(p.getNombre())
                .descripcion(p.getDescripcion())
                .cantidad(p.getCantidad())
                .precio(p.getPrecio())
                .fechaCreacion(p.getFechaCreacion())
                .fechaActualizacion(p.getFechaActualizacion())
                .build();
    }
}