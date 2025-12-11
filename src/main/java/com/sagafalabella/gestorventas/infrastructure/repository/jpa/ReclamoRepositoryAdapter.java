package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Reclamo;
import com.sagafalabella.gestorventas.domain.repository.ReclamoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ReclamoRepositoryAdapter implements ReclamoRepository {

    private final ReclamoJpaRepository reclamoJpaRepository;

    @Override
    public Reclamo save(Reclamo reclamo) {
        return reclamoJpaRepository.save(reclamo);
    }

    @Override
    public Optional<Reclamo> findByPedidoId(Long pedidoId) {
        return reclamoJpaRepository.findByPedidoId(pedidoId);
    }
}
