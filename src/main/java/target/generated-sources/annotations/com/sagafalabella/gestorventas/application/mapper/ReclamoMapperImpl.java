package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ReclamoDTO;
import com.sagafalabella.gestorventas.domain.entity.Reclamo;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-10T23:16:05-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class ReclamoMapperImpl implements ReclamoMapper {

    @Override
    public ReclamoDTO toDto(Reclamo reclamo) {
        if ( reclamo == null ) {
            return null;
        }

        ReclamoDTO reclamoDTO = new ReclamoDTO();

        reclamoDTO.setId( reclamo.getId() );
        reclamoDTO.setEstado( reclamo.getEstado() );
        reclamoDTO.setMotivo( reclamo.getMotivo() );
        reclamoDTO.setRma( reclamo.getRma() );

        return reclamoDTO;
    }

    @Override
    public Reclamo toEntity(ReclamoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Reclamo reclamo = new Reclamo();

        reclamo.setId( dto.getId() );
        reclamo.setEstado( dto.getEstado() );
        reclamo.setMotivo( dto.getMotivo() );
        reclamo.setRma( dto.getRma() );

        return reclamo;
    }
}
