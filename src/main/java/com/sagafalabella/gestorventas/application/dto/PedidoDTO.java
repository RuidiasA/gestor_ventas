package com.sagafalabella.gestorventas.application.dto;

import com.sagafalabella.gestorventas.domain.entity.EstadoPedido;
import com.sagafalabella.gestorventas.domain.entity.TipoEntrega;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PedidoDTO {
    private Long id;
    private Long clienteId;
    private EstadoPedido estado;
    private TipoEntrega tipoEntrega;
    private BigDecimal subtotal;
    private BigDecimal igv;
    private BigDecimal total;
    private List<DetallePedidoDTO> detalles;
}
