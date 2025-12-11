package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Comprobante;
import com.sagafalabella.gestorventas.domain.repository.ComprobanteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ComprobanteRepositoryAdapter implements ComprobanteRepository {

    private final ComprobanteJpaRepository comprobanteJpaRepository;

    @Override
    public Comprobante save(Comprobante comprobante) {
        return comprobanteJpaRepository.save(comprobante);
    }
}
