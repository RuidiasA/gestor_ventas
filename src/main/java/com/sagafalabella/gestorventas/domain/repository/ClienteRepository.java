package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.Cliente;

import java.util.Optional;

public interface ClienteRepository {
    Optional<Cliente> findById(Long id);
}
