package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.RoleType;
import com.sagafalabella.gestorventas.domain.entity.Rol;
import com.sagafalabella.gestorventas.domain.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RolRepositoryAdapter implements RolRepository {

    private final RolJpaRepository rolJpaRepository;

    @Override
    public Optional<Rol> findByNombre(RoleType nombre) {
        return rolJpaRepository.findByNombre(nombre);
    }
}
