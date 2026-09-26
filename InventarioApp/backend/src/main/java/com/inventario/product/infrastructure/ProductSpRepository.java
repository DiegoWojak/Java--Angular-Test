package com.inventario.product.infrastructure;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.inventario.product.domain.Product;
import com.inventario.product.domain.ProductRepository;
import com.inventario.shared.infrastructure.persistence.BaseSpRepository;

/** {@link ProductRepository} */
@Repository 
public class ProductSpRepository extends BaseSpRepository implements ProductRepository{

    private static final RowMapper<Product> MAPPER = (rs, i) -> Product.builder()
            .id(rs.getLong("id"))
            .nombre(rs.getString("nombre"))
            .descripcion(rs.getString("descripcion"))
            .cantidad(rs.getInt("cantidad"))
            .precio(rs.getBigDecimal("precio"))
            .fechaCreacion(toLocal(rs.getTimestamp("fecha_creacion")))
            .fechaActualizacion(toLocal(rs.getTimestamp("fecha_actualizacion")))
            .build();

    protected ProductSpRepository(JdbcTemplate jdbcTemplate) {
        super(jdbcTemplate);
        //TODO Auto-generated constructor stub
    }

    @Override
    public Optional<Product> findById(Long id) {
        return callForOptional("dbo.sp_product_obtener", params("id", id), MAPPER);
    }

    @Override
    public Product insert(Product entity) {
        return callForOptional("dbo.sp_product_insertar", params(
            "nombre", entity.getNombre(),
            "descripcion", entity.getDescripcion(),
            "cantidad", entity.getCantidad(),
            "precio", entity.getPrecio()), MAPPER)
            .orElseThrow(() -> new IllegalStateException("Procedimiento: sp_producto_insertar no devolvió el registro"
        ));
    }

    @Override
    public Optional<Product> update(Long id, Product entity) {
        return callForOptional("dbo.sp_product_actualizar", params(
                "id", id,
                "nombre", entity.getNombre(),
                "descripcion", entity.getDescripcion(),
                "cantidad", entity.getCantidad(),
                "precio", entity.getPrecio()), MAPPER);
    }

    @Override
    public boolean deleteById(Long id) {
        Integer filas = callForScalar("dbo.sp_product_eliminar", params("id", id), Integer.class);
        return filas != null && filas > 0;
    }

    @Override
    public List<Product> buscar(String nombre) {
        return callForList("dbo.sp_product_listar", params("nombre", nombre), MAPPER);
    }
    

    private static LocalDateTime toLocal(Timestamp ts) {
        return ts == null ? null : ts.toLocalDateTime();
    }
}
