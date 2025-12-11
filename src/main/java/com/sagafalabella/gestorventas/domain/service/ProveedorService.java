package com.sagafalabella.gestorventas.domain.service;

import com.sagafalabella.gestorventas.application.dto.ProveedorDTO;

import java.util.List;

public interface ProveedorService {
    ProveedorDTO create(ProveedorDTO dto);
    List<ProveedorDTO> findAll();
    ProveedorDTO update(Long id, ProveedorDTO dto);
    void delete(Long id);
}
