package com.inventario.product.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventario.product.application.ProductService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Productos", description = "Mantenimiento de productos del inventario")
@RestController
@RequestMapping("/api/productos")
public class ProductController {
    private final ProductService service;
    
    public ProductController(ProductService service) {
        this.service = service;
    }

}
