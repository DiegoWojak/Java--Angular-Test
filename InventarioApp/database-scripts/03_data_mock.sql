/* =============================================================
   Datos de prueba
   Usuario demo: 
   admin / admin123 (hash BCrypt)
   user1 / 123456789 (hash BCrypt)
   https://bcrypt-generator.com/
   ============================================================= */

USE InventarioDB;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.usuarios WHERE username = 'admin')
    INSERT INTO dbo.usuarios (username, password_hash, rol)
    VALUES ('admin', '$2a$10$zrXTNjRoiHiipJ4OIHC/mOQU3CUNRGpEC.GbbNeMqnYu82wXYzmVu', 'ADMIN');
GO

IF NOT EXISTS (SELECT 1 FROM dbo.usuarios WHERE username = 'user1')
    INSERT INTO dbo.usuarios (username, password_hash, rol)
    VALUES ('user1', '$2a$12$eQGrg6nzbzJgPvi.sMxOXeKQdrsd1o/gM7Jlaa0V70k7sM1hl0VnC', 'USUARIO');
GO

IF NOT EXISTS (SELECT 1 FROM dbo.productos)
    INSERT INTO dbo.productos (nombre, descripcion, cantidad, precio) VALUES
    ('Laptop Lenovo ThinkPad', 'Laptop 14" Core i5, 16GB RAM', 15, 3899.90),
    ('Mouse Logitech M185', 'Mouse inalámbrico USB', 120, 49.90),
    ('Teclado Mecánico Redragon', 'Teclado mecánico switches blue', 45, 189.00),
    ('Monitor LG 27"', 'Monitor IPS Full HD 75Hz', 30, 799.00);
GO