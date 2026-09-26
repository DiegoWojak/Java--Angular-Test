# Instalación
  ## Requisitos previos
  
  | Herramienta        | Versión               | Verificar                        |
  |--------------------|-----------------------|----------------------------------|
  | JDK 8 (Temurin 8)  | 1.8.x                 | `java -version` → `1.8.x`        |
  | Maven *(opcional)* | 3.6.3+                | `mvn -v` → `Java version: 1.8`   |
  | Node.js            | 18.19+, 20.11+ o 22   | `node -v`, `npm -v`              |
  | SQL Server Express | 2019, 2022 o 2025     | —                                |
  | SSMS               | Última versión        | —                                |
  | Chrome / Postman   | —                     | —                                |

## Pasos

1. **Base de datos**: ver [DB-Install](./Documentos/DB-Install.docx)
2. **Backend**: ver [Backend-Install](./Documentos/Backend-Install.docx)
3. **Frontend**: ver [Frontend-Install](./Documentos/Frontend-Install.docx)

> Seguir el orden indicado: el backend depende de la base de datos y el frontend del backend.

## Desarrollo (`dev`)

| Capa     | Comando                                                  |
|----------|----------------------------------------------------------|
| Frontend | `ng serve`                                               |
| Backend  | `.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev` |

# Arquitectura 

## Frontend

![Arquitectura Frontend](./Documentos/Arquitectura/frontend.drawio.svg)

## Backend

![Arquitectura Backend](./Documentos/Arquitectura/backend.drawio.svg)

## Base de datos

![Arquitectura Base de datos](./Documentos/Arquitectura/db.drawio.svg)

## Implementation
Fase 1.-
La estructura base de cada capa se implementó siguiendo los diagramas de [Arquitectura](#arquitectura), en un commit por capa:

| Capa          | Commit                                                              | Contenido                                                                 |
|---------------|---------------------------------------------------------------------|---------------------------------------------------------------------------|
| Frontend      | [`f224665`](https://github.com/DiegoWojak/NOMBRE-REPO/commit/f224665) | Vistas, clases, interfaces y servicios que replican el modelo front |
| Backend       | [`4883988`](https://github.com/DiegoWojak/NOMBRE-REPO/commit/4883988) | Jerarquía de clases según el diagrama y extensiones base      |
| Base de datos | [`11a3d07`](https://github.com/DiegoWojak/NOMBRE-REPO/commit/11a3d07) | Creación de la BD, tablas, datos iniciales para el backend y procedures   

Sin problemas de compilación

Fase 2.- 

Ajuste de conexiones y requerimientos, siguiendo el orden Base de datos &rarr; Backend &rarr; Frontend.

| Capa          | Objetivo                                                                                         | Evidencia |
|---------------|--------------------------------------------------------------------------------------------------|-----------|
| Base de datos | Procedures funcionales                                                                           | <img width="389" alt="Procedures funcionales" src="https://github.com/user-attachments/assets/0e805fd3-7a18-47b2-8f01-f24d71982ac4" /> |
| Backend       | Endpoints de Producto y Usuarios funcionales desde Swagger, ambos protegidos con JWT              | <img width="487" alt="Swagger con endpoints de Producto y Usuarios" src="https://github.com/user-attachments/assets/bb0acc5a-d902-411e-a626-d5ca70d1c1c8" /> |
| Frontend      | Login funcional y vista de productos   | <img width="629" alt="Login y vista de productos" src="https://github.com/user-attachments/assets/7324070c-a009-4358-8998-b1c75091c55a" /> |

Fase 3

Pruebas en ambiente `dev` para la versión **MVP 0.1**.

> **Credenciales de prueba:** usuario `admin` / clave `admin123`

| #  | Caso                     | Front | Back |
|----|--------------------------|:-----:|:----:|
| 1  | Vista inicial            | ✅    | —    |
| 2  | Credenciales incorrectas | ✅    | —    |
| 3  | Login exitoso            | ✅    | ✅   |
| 4  | Buscar producto          | ✅    | ✅   |
| 5  | Crear producto           | ✅    | ✅   |
| 6  | Eliminar producto        | ✅    | ✅   |
| 7  | Actualizar producto      | ✅    | ✅   |

<details>
<summary><b>1. Vista inicial</b></summary>
<br>

<img width="439" alt="Vista inicial" src="https://github.com/user-attachments/assets/c61e6cec-75ce-439b-a92e-6d17d0586405" />

</details>

<details>
<summary><b>2. Credenciales incorrectas</b></summary>
<br>

<img width="800" alt="Mensaje de error por credenciales incorrectas" src="https://github.com/user-attachments/assets/ab4d4347-515c-4213-9774-81e781382e04" />

</details>

<details>
<summary><b>3. Login exitoso</b></summary>
<br>

**Front**

<img width="800" alt="Pantalla tras login exitoso" src="https://github.com/user-attachments/assets/ed1539ac-57cd-4d43-8b59-82b6fdda2def" />

**Back**

<img width="800" alt="Log del backend en login exitoso" src="https://github.com/user-attachments/assets/babc845d-4858-4a5f-9296-a84306d3bac3" />

</details>

<details>
<summary><b>4. Buscar producto</b></summary>
<br>

**Front**

<img width="800" alt="Resultado de búsqueda de producto" src="https://github.com/user-attachments/assets/0fa3cc40-90e9-40f2-bbf1-6a2c2e17b8f1" />

**Back**

<img width="800" alt="Log del backend en búsqueda" src="https://github.com/user-attachments/assets/6afe7b6f-545a-4ad9-bdd8-53a15941ab13" />

</details>

<details>
<summary><b>5. Crear producto</b></summary>
<br>

**Formulario**

<img width="592" alt="Formulario de creación de producto" src="https://github.com/user-attachments/assets/24953994-1d69-4a3e-855b-01f21d95338e" />

**Front:** el producto se agrega y aparece en el listado

<img width="587" alt="Producto nuevo en el listado" src="https://github.com/user-attachments/assets/c52c6e0a-26ff-4753-b500-1ac2986b7218" />

**Back**

<img width="800" alt="Log del backend al crear producto" src="https://github.com/user-attachments/assets/cc379e78-7cd6-4fa9-8379-2ad1e1d55b7a" />

</details>

<details>
<summary><b>6. Eliminar producto</b></summary>
<br>

**Confirmación**

<img width="683" alt="Confirmación de eliminación" src="https://github.com/user-attachments/assets/d6d5fc2d-09d6-4b3c-815d-13f37c20669b" />

**Front:** envía el `id` del producto

<img width="608" alt="Request de eliminación con id" src="https://github.com/user-attachments/assets/1e91e590-6473-417e-ad7c-6288b3673c85" />

**Back**

<img width="314" alt="Log del backend al eliminar" src="https://github.com/user-attachments/assets/f3a406c3-34bc-45ac-bc83-a1aab1e6dab1" />

</details>

<details>
<summary><b>7. Actualizar producto</b></summary>
<br>

**Formulario**

<img width="577" alt="Formulario de edición de producto" src="https://github.com/user-attachments/assets/8ba517c3-67a0-4872-ab5c-e32dde2f1e53" />

**Front:** envía el `id` con los datos modificados

<img width="425" alt="Request de actualización con id y datos" src="https://github.com/user-attachments/assets/30192d56-5a51-4a70-9d91-635b5179e32a" />

**Back**

<img width="565" alt="Log del backend al actualizar" src="https://github.com/user-attachments/assets/52dfaf61-273c-4477-b7ab-3c3e834a3499" />

</details>

Fase 4
