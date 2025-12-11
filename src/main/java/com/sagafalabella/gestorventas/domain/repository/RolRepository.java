package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.RoleType;
import com.sagafalabella.gestorventas.domain.entity.Rol;

import java.util.Optional;

public interface RolRepository {
    Optional<Rol> findByNombre(RoleType nombre);
}
