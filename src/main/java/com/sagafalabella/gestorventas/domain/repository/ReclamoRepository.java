package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.Reclamo;

import java.util.Optional;

public interface ReclamoRepository {
    Reclamo save(Reclamo reclamo);
    Optional<Reclamo> findByPedidoId(Long pedidoId);
}
