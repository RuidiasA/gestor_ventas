package com.sagafalabella.gestorventas.application.dto;

import com.sagafalabella.gestorventas.domain.entity.EstadoPedido;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PedidoResumenDTO {
    private Long pedidoId;
    private EstadoPedido estado;
    private BigDecimal total;
}
