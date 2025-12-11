package com.sagafalabella.gestorventas.domain.service;

import com.sagafalabella.gestorventas.application.dto.PedidoDTO;
import com.sagafalabella.gestorventas.application.dto.PedidoResumenDTO;
import com.sagafalabella.gestorventas.application.dto.PagoRequest;
import com.sagafalabella.gestorventas.application.dto.ReclamoDTO;

import java.util.List;

public interface PedidoService {
    PedidoDTO registrarPedido(PedidoDTO dto);
    PedidoDTO pagarPedido(Long id, PagoRequest pagoRequest);
    PedidoDTO prepararPedido(Long id);
    PedidoDTO despacharPedido(Long id);
    PedidoDTO entregarPedido(Long id);
    ReclamoDTO registrarReclamo(Long pedidoId, ReclamoDTO reclamoDTO);
    List<PedidoResumenDTO> reportePedidos();
}
