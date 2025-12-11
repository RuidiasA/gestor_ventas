package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Comprobante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComprobanteJpaRepository extends JpaRepository<Comprobante, Long> {
}
