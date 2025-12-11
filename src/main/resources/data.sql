INSERT INTO roles(id, created_at, updated_at, nombre) VALUES (1, NOW(), NOW(), 'CLIENTE') ON DUPLICATE KEY UPDATE nombre='CLIENTE';
INSERT INTO roles(id, created_at, updated_at, nombre) VALUES (2, NOW(), NOW(), 'VENDEDOR') ON DUPLICATE KEY UPDATE nombre='VENDEDOR';
INSERT INTO roles(id, created_at, updated_at, nombre) VALUES (3, NOW(), NOW(), 'ADMINISTRADOR') ON DUPLICATE KEY UPDATE nombre='ADMINISTRADOR';
INSERT INTO roles(id, created_at, updated_at, nombre) VALUES (4, NOW(), NOW(), 'SOPORTE') ON DUPLICATE KEY UPDATE nombre='SOPORTE';

INSERT INTO proveedores(id, created_at, updated_at, nombre, contacto, telefono, email)
VALUES (1, NOW(), NOW(), 'Proveedor Demo', 'Contacto Demo', '999999999', 'proveedor@demo.com')
ON DUPLICATE KEY UPDATE nombre='Proveedor Demo';

INSERT INTO productos(id, created_at, updated_at, nombre, descripcion, categoria, marca, precio, proveedor_id)
VALUES (1, NOW(), NOW(), 'TV 50', 'Televisor 50 pulgadas', 'Electro', 'Falabella', 1500.00, 1)
ON DUPLICATE KEY UPDATE nombre='TV 50';

INSERT INTO inventarios(id, created_at, updated_at, stock, disponible, producto_id)
VALUES (1, NOW(), NOW(), 10, true, 1)
ON DUPLICATE KEY UPDATE stock=10;
