package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.Inventario;

import java.util.Optional;

public interface InventarioRepository {
    Inventario save(Inventario inventario);
    Optional<Inventario> findByProductoId(Long productoId);
}
