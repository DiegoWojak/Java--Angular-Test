/* Creación de DB */

IF DB_ID('InventarioDB') IS NULL
    CREATE DATABASE InventarioDB;
GO

USE InventarioDB;
GO

IF OBJECT_ID('dbo.productos', 'U') IS NULL
CREATE TABLE dbo.productos (
    id                  BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT pk_productos PRIMARY KEY,
    nombre              VARCHAR(100)   NOT NULL,
    descripcion         VARCHAR(255)   NULL,
    cantidad            INT            NOT NULL CONSTRAINT ck_productos_cantidad CHECK (cantidad >= 0),
    precio              DECIMAL(10,2)  NOT NULL CONSTRAINT ck_productos_precio   CHECK (precio >= 0),
    fecha_creacion      DATETIME2      NOT NULL CONSTRAINT df_productos_fcrea DEFAULT SYSDATETIME(),
    fecha_actualizacion DATETIME2      NULL
);
GO

IF OBJECT_ID('dbo.usuarios', 'U') IS NULL
CREATE TABLE dbo.usuarios (
    id            BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT pk_usuarios PRIMARY KEY,
    username      VARCHAR(50)  NOT NULL CONSTRAINT uq_usuarios_username UNIQUE,
    password_hash VARCHAR(100) NOT NULL,   -- BCrypt
    rol           VARCHAR(20)  NOT NULL CONSTRAINT df_usuarios_rol DEFAULT 'USER',
    activo        BIT          NOT NULL CONSTRAINT df_usuarios_activo DEFAULT 1
);
GO

ALTER TABLE [InventarioDB].[dbo].[usuarios]
ADD CONSTRAINT CK_usuarios_rol
CHECK (rol COLLATE Latin1_General_CS_AS IN ('ADMIN', 'USUARIO'));

/*Indices*/
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'ix_productos_nombre')
    CREATE INDEX ix_productos_nombre ON dbo.productos (nombre);
GO