# Frontend Saga Falabella – Gestión de Ventas

Frontend profesional sin frameworks (HTML5 + CSS3 + JavaScript ES6) para el backend Spring Boot 3 (/api/v1) de gestión de ventas, pedidos y reclamos.

## Estructura
- `public/css`: estilos globales, componentes, formularios, tablas y vistas ecommerce.
- `public/js`: módulos separados por dominio (auth, cliente, vendedor, admin, soporte) y utilitarios.
- `views`: páginas HTML divididas por rol con navegación entre paneles.
- `public/img`: coloca aquí los logos e íconos requeridos.

## Configuración
1. Ajusta la URL del backend definiendo `window.__API_BASE` en cualquier HTML si tu API no está montada en `/api/v1`.
2. Sirve la carpeta `views` como estática (por ejemplo con `npm install -g serve` y `serve views` o `python -m http.server 8000` desde el directorio raíz).
3. Las peticiones incluyen automáticamente el JWT desde `localStorage`.

## Roles y navegación
- **Cliente**: `/views/cliente/home.html` con acceso a catálogo, carrito, checkout, pedidos y reclamos.
- **Vendedor**: `/views/vendedor/panel.html` y pedidos en tienda con confirmación de retiro (QR simulado por código).
- **Administrador**: dashboard, CRUD de productos/proveedores, inventario, usuarios y reportes.
- **Soporte**: listado y detalle de reclamos con actualización de estados.

## Autenticación
- Login en `/views/login.html` → POST `/api/v1/auth/login`.
- Registro en `/views/register.html` → POST `/api/v1/auth/register`.
- El token + rol se guardan en `localStorage` (`auth`), se adjunta como `Authorization: Bearer` y se controla con `authGuard`.

## Carrito y checkout
- Carrito persistente en `localStorage` (`cart_items`).
- Totales con IGV calculados en frontend.
- Checkout envía `POST /api/v1/pedidos` con items `{ productoId, cantidad }` y datos de entrega.

## Reclamos y soporte
- Clientes pueden crear reclamos asociados a un pedido.
- Soporte gestiona estados (pendiente → revisado → resuelto) y puede ver detalle.

## Indicaciones
- La carpeta `frontend` anterior fue removida para usar solo HTML/CSS/JS nativo.
- Personaliza iconos en `public/img` según tu branding.
