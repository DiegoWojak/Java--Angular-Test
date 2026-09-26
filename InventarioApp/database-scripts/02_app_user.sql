/* Login de la aplicación 
   Un usuario para la aplicación y el scheme responsable
*/

USE master;
GO

IF NOT EXISTS (SELECT 1 FROM sys.server_principals WHERE name = 'inventario_app')
    CREATE LOGIN inventario_app WITH PASSWORD = 'Inventario#2026', DEFAULT_DATABASE = InventarioDB;
GO

USE InventarioDB;
GO

IF NOT EXISTS (SELECT 1 FROM sys.database_principals WHERE name = 'inventario_app')
    CREATE USER inventario_app FOR LOGIN inventario_app;
GO

GRANT EXECUTE ON SCHEMA::dbo TO inventario_app;
GO