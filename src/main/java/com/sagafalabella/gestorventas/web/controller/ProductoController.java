package com.sagafalabella.gestorventas.web.controller;

import com.sagafalabella.gestorventas.application.dto.ProductoDTO;
import com.sagafalabella.gestorventas.domain.service.ProductoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@Valid @RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.create(dto));
    }

    @GetMapping
    public ResponseEntity<List<ProductoDTO>> listar(
            @RequestParam(name = "categoria", required = false) String categoria,
            @RequestParam(name = "marca", required = false) String marca,
            @RequestParam(name = "precioMin", required = false) String precioMin,
            @RequestParam(name = "precioMax", required = false) String precioMax,
            @RequestParam(name = "disponible", required = false) Boolean disponible
    ) {
        return ResponseEntity.ok(
                productoService.findAll(categoria, marca, precioMin, precioMax, disponible)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoDTO> actualizar(@PathVariable Long id, @RequestBody ProductoDTO dto) {
        return ResponseEntity.ok(productoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
