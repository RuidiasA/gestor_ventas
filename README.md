# Sistema de Gestión de Ventas y Experiencia del Cliente – Saga Falabella

Backend profesional construido con **Java 17 + Spring Boot 3** siguiendo arquitectura limpia para cubrir autenticación, catálogo, inventario, pedidos, pagos simulados, reclamos y reportes.

## Arquitectura
```
/src/main/java/com/sagafalabella/gestorventas
    /domain          -> entidades de negocio, repositorios y contratos de servicios
    /application     -> DTOs, mappers MapStruct, casos de uso y servicios de aplicación
    /infrastructure  -> adaptadores JPA, seguridad JWT, configuración y excepciones
    /web             -> controladores REST y manejador global de errores
```

## Tecnologías
- Spring Boot 3, Spring Web, Spring Data JPA, Hibernate
- Spring Security 6 con JWT y BCrypt
- MapStruct para mapeo DTO
- Lombok
- MySQL 8
- SpringDoc OpenAPI para documentación
- Dockerfile y docker-compose con MySQL

## Ejecución local
```bash
./mvnw spring-boot:run
```

## Docker
```bash
docker-compose up --build
```
La aplicación queda disponible en `http://localhost:8080` y la base de datos en el puerto `3306`.

## Configuración
Variables principales en `src/main/resources/application.properties`:
- `spring.datasource.*` para conexión MySQL
- `app.security.jwt.*` para secretos y expiración JWT

## Endpoints principales
- `POST /api/v1/auth/login` y `/api/v1/auth/register`
- `GET/POST/PUT/DELETE /api/v1/productos` con filtros de catálogo
- `GET/POST/PUT/DELETE /api/v1/proveedores`
- Flujo de pedidos: `POST /api/v1/pedidos`, `/pago`, `/preparacion`, `/despacho`, `/entrega`
- Reclamos: `POST /api/v1/pedidos/{id}/reclamos`
- Reportes: `GET /api/v1/pedidos/reportes`

## Datos de prueba
`data.sql` carga roles base, un proveedor, producto e inventario inicial.

## Documentación API
Disponible con Swagger UI en `/swagger-ui.html` y OpenAPI JSON en `/v3/api-docs`.
