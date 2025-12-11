package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InventarioJpaRepository extends JpaRepository<Inventario, Long> {
    Optional<Inventario> findByProductoId(Long productoId);
}
