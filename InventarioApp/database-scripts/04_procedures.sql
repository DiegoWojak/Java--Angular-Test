USE InventarioDB;
GO

/* ---------- PRODUCTOS ---------- */

CREATE OR ALTER PROCEDURE dbo.sp_product_listar
    @nombre VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id, nombre, descripcion, cantidad, precio, fecha_creacion, fecha_actualizacion
    FROM dbo.productos
    WHERE @nombre IS NULL OR @nombre = '' OR nombre LIKE '%' + @nombre + '%'
    ORDER BY nombre;
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_product_obtener
    @id BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id, nombre, descripcion, cantidad, precio, fecha_creacion, fecha_actualizacion
    FROM dbo.productos
    WHERE id = @id;
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_product_insertar
    @nombre      VARCHAR(100),
    @descripcion VARCHAR(255),
    @cantidad    INT,
    @precio      DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO dbo.productos (nombre, descripcion, cantidad, precio)
    OUTPUT inserted.id, inserted.nombre, inserted.descripcion, inserted.cantidad,
           inserted.precio, inserted.fecha_creacion, inserted.fecha_actualizacion
    VALUES (@nombre, @descripcion, @cantidad, @precio);
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_product_actualizar
    @id          BIGINT,
    @nombre      VARCHAR(100),
    @descripcion VARCHAR(255),
    @cantidad    INT,
    @precio      DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE dbo.productos
       SET nombre = @nombre,
           descripcion = @descripcion,
           cantidad = @cantidad,
           precio = @precio,
           fecha_actualizacion = SYSDATETIME()
    OUTPUT inserted.id, inserted.nombre, inserted.descripcion, inserted.cantidad,
           inserted.precio, inserted.fecha_creacion, inserted.fecha_actualizacion
     WHERE id = @id;
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_product_eliminar
    @id BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM dbo.productos WHERE id = @id;
    SELECT @@ROWCOUNT AS filas_afectadas;
END
GO

CREATE OR ALTER PROCEDURE dbo.sp_usuario_por_username
    @username VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT id, username, password_hash, rol, activo
    FROM dbo.usuarios
    WHERE username = @username;
END
GO