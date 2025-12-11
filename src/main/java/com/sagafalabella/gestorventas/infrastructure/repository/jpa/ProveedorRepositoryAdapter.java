package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Proveedor;
import com.sagafalabella.gestorventas.domain.repository.ProveedorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ProveedorRepositoryAdapter implements ProveedorRepository {

    private final ProveedorJpaRepository proveedorJpaRepository;

    @Override
    public Proveedor save(Proveedor proveedor) {
        return proveedorJpaRepository.save(proveedor);
    }

    @Override
    public List<Proveedor> findAll() {
        return proveedorJpaRepository.findAll();
    }

    @Override
    public Optional<Proveedor> findById(Long id) {
        return proveedorJpaRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        proveedorJpaRepository.deleteById(id);
    }
}
