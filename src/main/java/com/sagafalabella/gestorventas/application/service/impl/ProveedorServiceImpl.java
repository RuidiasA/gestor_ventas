package com.sagafalabella.gestorventas.application.service.impl;

import com.sagafalabella.gestorventas.application.dto.ProveedorDTO;
import com.sagafalabella.gestorventas.application.mapper.ProveedorMapper;
import com.sagafalabella.gestorventas.domain.entity.Proveedor;
import com.sagafalabella.gestorventas.domain.repository.ProveedorRepository;
import com.sagafalabella.gestorventas.domain.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository proveedorRepository;
    private final ProveedorMapper proveedorMapper;

    @Override
    @Transactional
    public ProveedorDTO create(ProveedorDTO dto) {
        Proveedor proveedor = proveedorMapper.toEntity(dto);
        return proveedorMapper.toDto(proveedorRepository.save(proveedor));
    }

    @Override
    public List<ProveedorDTO> findAll() {
        return proveedorRepository.findAll().stream()
                .map(proveedorMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProveedorDTO update(Long id, ProveedorDTO dto) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado"));
        proveedor.setNombre(dto.getNombre());
        proveedor.setContacto(dto.getContacto());
        proveedor.setTelefono(dto.getTelefono());
        proveedor.setEmail(dto.getEmail());
        return proveedorMapper.toDto(proveedorRepository.save(proveedor));
    }

    @Override
    public void delete(Long id) {
        proveedorRepository.deleteById(id);
    }
}
