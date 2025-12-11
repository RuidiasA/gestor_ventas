package com.sagafalabella.gestorventas.application.service.impl;

import com.sagafalabella.gestorventas.application.dto.*;
import com.sagafalabella.gestorventas.application.mapper.PedidoMapper;
import com.sagafalabella.gestorventas.application.mapper.ReclamoMapper;
import com.sagafalabella.gestorventas.domain.entity.*;
import com.sagafalabella.gestorventas.domain.repository.*;
import com.sagafalabella.gestorventas.domain.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final InventarioRepository inventarioRepository;
    private final ComprobanteRepository comprobanteRepository;
    private final ReclamoRepository reclamoRepository;
    private final ClienteMapper clienteMapper;
    private final PedidoMapper pedidoMapper;
    private final ReclamoMapper reclamoMapper;
    private final com.sagafalabella.gestorventas.domain.repository.ClienteRepository clienteRepository;

    @Override
    @Transactional
    public PedidoDTO registrarPedido(PedidoDTO dto) {
        Pedido pedido = pedidoMapper.toEntity(dto);
        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado"));
        pedido.setCliente(cliente);
        pedido.setEstado(EstadoPedido.REGISTRADO);

        BigDecimal subtotal = BigDecimal.ZERO;
        for (DetallePedidoDTO detalleDTO : dto.getDetalles()) {
            Producto producto = productoRepository.findById(detalleDTO.getProductoId())
                    .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
            Inventario inventario = inventarioRepository.findByProductoId(producto.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Inventario no encontrado"));
            if (inventario.getStock() < detalleDTO.getCantidad()) {
                throw new IllegalArgumentException("Stock insuficiente");
            }
            inventario.setStock(inventario.getStock() - detalleDTO.getCantidad());
            inventarioRepository.save(inventario);

            DetallePedido detalle = new DetallePedido();
            detalle.setPedido(pedido);
            detalle.setProducto(producto);
            detalle.setCantidad(detalleDTO.getCantidad());
            detalle.setPrecioUnitario(producto.getPrecio());
            pedido.getDetalles().add(detalle);
            subtotal = subtotal.add(producto.getPrecio().multiply(BigDecimal.valueOf(detalleDTO.getCantidad())));
        }
        pedido.setSubtotal(subtotal);
        pedido.setIgv(subtotal.multiply(BigDecimal.valueOf(0.18)));
        pedido.setTotal(pedido.getSubtotal().add(pedido.getIgv()));

        return pedidoMapper.toDto(pedidoRepository.save(pedido));
    }

    @Override
    @Transactional
    public PedidoDTO pagarPedido(Long id, PagoRequest pagoRequest) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));
        if (pedido.getEstado() != EstadoPedido.REGISTRADO) {
            throw new IllegalStateException("Solo se pueden pagar pedidos registrados");
        }
        pedido.setEstado(EstadoPedido.PAGADO);
        Comprobante comprobante = new Comprobante();
        comprobante.setNumero(UUID.randomUUID().toString());
        comprobante.setMonto(pedido.getTotal());
        comprobante.setPedido(pedido);
        pedido.setComprobante(comprobante);
        comprobanteRepository.save(comprobante);
        return pedidoMapper.toDto(pedidoRepository.save(pedido));
    }

    @Override
    @Transactional
    public PedidoDTO prepararPedido(Long id) {
        return cambiarEstado(id, EstadoPedido.PREPARADO);
    }

    @Override
    @Transactional
    public PedidoDTO despacharPedido(Long id) {
        return cambiarEstado(id, EstadoPedido.DESPACHADO);
    }

    @Override
    @Transactional
    public PedidoDTO entregarPedido(Long id) {
        return cambiarEstado(id, EstadoPedido.ENTREGADO);
    }

    @Override
    @Transactional
    public ReclamoDTO registrarReclamo(Long pedidoId, ReclamoDTO reclamoDTO) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));
        Reclamo reclamo = reclamoMapper.toEntity(reclamoDTO);
        reclamo.setEstado(EstadoReclamo.PENDIENTE);
        reclamo.setPedido(pedido);
        reclamo.setRma("RMA-" + UUID.randomUUID());
        return reclamoMapper.toDto(reclamoRepository.save(reclamo));
    }

    @Override
    public List<PedidoResumenDTO> reportePedidos() {
        return pedidoRepository.findByEstado(EstadoPedido.PAGADO)
                .stream()
                .map(p -> new PedidoResumenDTO(p.getId(), p.getEstado(), p.getTotal()))
                .collect(Collectors.toList());
    }

    private PedidoDTO cambiarEstado(Long id, EstadoPedido estado) {
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pedido no encontrado"));
        pedido.setEstado(estado);
        return pedidoMapper.toDto(pedidoRepository.save(pedido));
    }
}
