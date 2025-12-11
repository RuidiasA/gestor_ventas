package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ProveedorDTO;
import com.sagafalabella.gestorventas.domain.entity.Proveedor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProveedorMapper {
    ProveedorDTO toDto(Proveedor proveedor);
    Proveedor toEntity(ProveedorDTO dto);
}
