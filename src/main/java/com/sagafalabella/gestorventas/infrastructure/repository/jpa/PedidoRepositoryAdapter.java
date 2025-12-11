package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.EstadoPedido;
import com.sagafalabella.gestorventas.domain.entity.Pedido;
import com.sagafalabella.gestorventas.domain.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class PedidoRepositoryAdapter implements PedidoRepository {

    private final PedidoJpaRepository pedidoJpaRepository;

    @Override
    public Pedido save(Pedido pedido) {
        return pedidoJpaRepository.save(pedido);
    }

    @Override
    public Optional<Pedido> findById(Long id) {
        return pedidoJpaRepository.findById(id);
    }

    @Override
    public List<Pedido> findByEstado(EstadoPedido estado) {
        return pedidoJpaRepository.findByEstado(estado);
    }
}
