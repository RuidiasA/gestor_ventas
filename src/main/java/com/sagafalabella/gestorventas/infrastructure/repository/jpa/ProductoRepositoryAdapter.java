package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Producto;
import com.sagafalabella.gestorventas.domain.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ProductoRepositoryAdapter implements ProductoRepository {

    private final ProductoJpaRepository productoJpaRepository;

    @Override
    public Producto save(Producto producto) {
        return productoJpaRepository.save(producto);
    }

    @Override
    public List<Producto> findAll() {
        return productoJpaRepository.findAll();
    }

    @Override
    public Optional<Producto> findById(Long id) {
        return productoJpaRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        productoJpaRepository.deleteById(id);
    }

    @Override
    public List<Producto> findByFilters(String categoria, String marca, BigDecimal precioMin, BigDecimal precioMax, Boolean disponible) {
        return productoJpaRepository.search(categoria, marca, precioMin, precioMax, disponible);
    }
}
