package com.sagafalabella.gestorventas.application.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DetallePedidoDTO {
    private Long productoId;
    private Integer cantidad;
    private BigDecimal precioUnitario;
}
