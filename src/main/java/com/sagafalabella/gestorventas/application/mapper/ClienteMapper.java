package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ClienteDTO;
import com.sagafalabella.gestorventas.domain.entity.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClienteMapper {
    @Mapping(source = "usuario.email", target = "email")
    ClienteDTO toDto(Cliente cliente);
}
