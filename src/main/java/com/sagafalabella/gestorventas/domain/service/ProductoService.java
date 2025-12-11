package com.sagafalabella.gestorventas.domain.service;

import com.sagafalabella.gestorventas.application.dto.ProductoDTO;

import java.util.List;

public interface ProductoService {
    ProductoDTO create(ProductoDTO dto);
    List<ProductoDTO> findAll(String categoria, String marca, String precioMin, String precioMax, Boolean disponible);
    ProductoDTO update(Long id, ProductoDTO dto);
    void delete(Long id);
}
