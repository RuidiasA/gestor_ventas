package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.InventarioDTO;
import com.sagafalabella.gestorventas.domain.entity.Inventario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-10T23:16:05-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class InventarioMapperImpl implements InventarioMapper {

    @Override
    public InventarioDTO toDto(Inventario inventario) {
        if ( inventario == null ) {
            return null;
        }

        InventarioDTO inventarioDTO = new InventarioDTO();

        inventarioDTO.setStock( inventario.getStock() );
        inventarioDTO.setDisponible( inventario.getDisponible() );

        return inventarioDTO;
    }

    @Override
    public Inventario toEntity(InventarioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Inventario inventario = new Inventario();

        inventario.setStock( dto.getStock() );
        inventario.setDisponible( dto.getDisponible() );

        return inventario;
    }
}
