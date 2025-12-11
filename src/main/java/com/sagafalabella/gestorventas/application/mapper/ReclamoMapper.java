package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ReclamoDTO;
import com.sagafalabella.gestorventas.domain.entity.Reclamo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReclamoMapper {
    ReclamoDTO toDto(Reclamo reclamo);
    Reclamo toEntity(ReclamoDTO dto);
}
