package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Inventario;
import com.sagafalabella.gestorventas.domain.repository.InventarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class InventarioRepositoryAdapter implements InventarioRepository {

    private final InventarioJpaRepository inventarioJpaRepository;

    @Override
    public Inventario save(Inventario inventario) {
        return inventarioJpaRepository.save(inventario);
    }

    @Override
    public Optional<Inventario> findByProductoId(Long productoId) {
        return inventarioJpaRepository.findByProductoId(productoId);
    }
}
