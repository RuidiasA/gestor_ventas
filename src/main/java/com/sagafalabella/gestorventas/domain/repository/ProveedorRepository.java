package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.Proveedor;

import java.util.List;
import java.util.Optional;

public interface ProveedorRepository {
    Proveedor save(Proveedor proveedor);
    List<Proveedor> findAll();
    Optional<Proveedor> findById(Long id);
    void deleteById(Long id);
}
