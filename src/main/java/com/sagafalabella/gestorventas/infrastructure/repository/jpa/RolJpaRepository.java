package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.RoleType;
import com.sagafalabella.gestorventas.domain.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolJpaRepository extends JpaRepository<Rol, Long> {
    Optional<Rol> findByNombre(RoleType nombre);
}
