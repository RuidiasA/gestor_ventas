package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.Producto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductoRepository {
    Producto save(Producto producto);
    List<Producto> findAll();
    Optional<Producto> findById(Long id);
    void deleteById(Long id);
    List<Producto> findByFilters(String categoria, String marca, BigDecimal precioMin, BigDecimal precioMax, Boolean disponible);
}
