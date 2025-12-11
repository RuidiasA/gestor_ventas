package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.InventarioDTO;
import com.sagafalabella.gestorventas.domain.entity.Inventario;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InventarioMapper {
    InventarioDTO toDto(Inventario inventario);
    Inventario toEntity(InventarioDTO dto);
}
