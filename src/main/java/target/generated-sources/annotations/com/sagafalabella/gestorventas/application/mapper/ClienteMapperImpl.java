package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ClienteDTO;
import com.sagafalabella.gestorventas.domain.entity.Cliente;
import com.sagafalabella.gestorventas.domain.entity.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-10T23:16:04-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class ClienteMapperImpl implements ClienteMapper {

    @Override
    public ClienteDTO toDto(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }

        ClienteDTO clienteDTO = new ClienteDTO();

        clienteDTO.setEmail( clienteUsuarioEmail( cliente ) );
        clienteDTO.setId( cliente.getId() );
        clienteDTO.setNombres( cliente.getNombres() );
        clienteDTO.setApellidos( cliente.getApellidos() );
        clienteDTO.setDocumento( cliente.getDocumento() );
        clienteDTO.setTelefono( cliente.getTelefono() );
        clienteDTO.setDireccion( cliente.getDireccion() );

        return clienteDTO;
    }

    private String clienteUsuarioEmail(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }
        Usuario usuario = cliente.getUsuario();
        if ( usuario == null ) {
            return null;
        }
        String email = usuario.getEmail();
        if ( email == null ) {
            return null;
        }
        return email;
    }
}
