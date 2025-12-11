package com.sagafalabella.gestorventas.application.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductoDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String categoria;
    private String marca;
    private BigDecimal precio;
    private Long proveedorId;
    private InventarioDTO inventario;
}
