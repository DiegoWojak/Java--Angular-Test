package com.inventario.product.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.inventario.product.application.ProductService;
import com.inventario.product.application.dto.ProductRequest;
import com.inventario.product.application.dto.ProductResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Productos", description = "Mantenimiento de productos del inventario")
@RestController
@RequestMapping("/api/productos")
public class ProductController {
    private final ProductService service;
    
    public ProductController(ProductService service) {
        this.service = service;
    }

    @Operation(summary = "Listar productos", description = "Filtra por nombre (contiene) si se envía ?nombre=")
    @GetMapping
    public List<ProductResponse> listar
    (@Parameter(description = "Texto a buscar en el nombre") @RequestParam(required = false) String nombre)
    {
        return service.listar(nombre);
    }

    public ProductResponse obtener(@PathVariable Long id){
        return service.obtener(id);
    }

    @Operation(summary = "Crear producto")
    @PostMapping
    @ResponseStatus (HttpStatus.CREATED)
    public ProductResponse crear(@Valid @RequestBody ProductRequest request){
        return service.crear(request);
    }

    @Operation(summary = "Actualizar producto")
    @PutMapping("/{id}")
    public ProductResponse actualizar(@PathVariable Long id, @Valid @RequestBody ProductRequest request){
        return service.actualizar(id, request);
    }

    @Operation(summary = "Eliminar producto")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id){
        service.eliminar(id);
    }
    
}
