package com.sagafalabella.gestorventas.web.controller;

import com.sagafalabella.gestorventas.application.dto.PagoRequest;
import com.sagafalabella.gestorventas.application.dto.PedidoDTO;
import com.sagafalabella.gestorventas.application.dto.PedidoResumenDTO;
import com.sagafalabella.gestorventas.application.dto.ReclamoDTO;
import com.sagafalabella.gestorventas.domain.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoDTO> registrar(@Valid @RequestBody PedidoDTO dto) {
        return ResponseEntity.ok(pedidoService.registrarPedido(dto));
    }

    @PostMapping("/{id}/pago")
    public ResponseEntity<PedidoDTO> pagar(@PathVariable Long id, @Valid @RequestBody PagoRequest request) {
        return ResponseEntity.ok(pedidoService.pagarPedido(id, request));
    }

    @PostMapping("/{id}/preparacion")
    public ResponseEntity<PedidoDTO> preparar(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.prepararPedido(id));
    }

    @PostMapping("/{id}/despacho")
    public ResponseEntity<PedidoDTO> despachar(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.despacharPedido(id));
    }

    @PostMapping("/{id}/entrega")
    public ResponseEntity<PedidoDTO> entregar(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.entregarPedido(id));
    }

    @PostMapping("/{id}/reclamos")
    public ResponseEntity<ReclamoDTO> registrarReclamo(@PathVariable Long id, @Valid @RequestBody ReclamoDTO dto) {
        return ResponseEntity.ok(pedidoService.registrarReclamo(id, dto));
    }

    @GetMapping("/reportes")
    public ResponseEntity<List<PedidoResumenDTO>> reportes() {
        return ResponseEntity.ok(pedidoService.reportePedidos());
    }
}
