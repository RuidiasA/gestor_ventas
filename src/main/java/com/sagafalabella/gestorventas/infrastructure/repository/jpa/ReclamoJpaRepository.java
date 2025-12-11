package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Reclamo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReclamoJpaRepository extends JpaRepository<Reclamo, Long> {
    Optional<Reclamo> findByPedidoId(Long pedidoId);
}
