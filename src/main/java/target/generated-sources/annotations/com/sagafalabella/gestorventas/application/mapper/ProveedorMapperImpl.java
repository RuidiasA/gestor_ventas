package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ProveedorDTO;
import com.sagafalabella.gestorventas.domain.entity.Proveedor;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-10T23:16:04-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class ProveedorMapperImpl implements ProveedorMapper {

    @Override
    public ProveedorDTO toDto(Proveedor proveedor) {
        if ( proveedor == null ) {
            return null;
        }

        ProveedorDTO proveedorDTO = new ProveedorDTO();

        proveedorDTO.setId( proveedor.getId() );
        proveedorDTO.setNombre( proveedor.getNombre() );
        proveedorDTO.setContacto( proveedor.getContacto() );
        proveedorDTO.setTelefono( proveedor.getTelefono() );
        proveedorDTO.setEmail( proveedor.getEmail() );

        return proveedorDTO;
    }

    @Override
    public Proveedor toEntity(ProveedorDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Proveedor proveedor = new Proveedor();

        proveedor.setId( dto.getId() );
        proveedor.setNombre( dto.getNombre() );
        proveedor.setContacto( dto.getContacto() );
        proveedor.setTelefono( dto.getTelefono() );
        proveedor.setEmail( dto.getEmail() );

        return proveedor;
    }
}
