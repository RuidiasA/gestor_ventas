package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.DetallePedidoDTO;
import com.sagafalabella.gestorventas.application.dto.PedidoDTO;
import com.sagafalabella.gestorventas.domain.entity.Cliente;
import com.sagafalabella.gestorventas.domain.entity.DetallePedido;
import com.sagafalabella.gestorventas.domain.entity.Pedido;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-10T23:16:04-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class PedidoMapperImpl implements PedidoMapper {

    @Override
    public PedidoDTO toDto(Pedido pedido) {
        if ( pedido == null ) {
            return null;
        }

        PedidoDTO pedidoDTO = new PedidoDTO();

        pedidoDTO.setClienteId( pedidoClienteId( pedido ) );
        pedidoDTO.setId( pedido.getId() );
        pedidoDTO.setEstado( pedido.getEstado() );
        pedidoDTO.setTipoEntrega( pedido.getTipoEntrega() );
        pedidoDTO.setSubtotal( pedido.getSubtotal() );
        pedidoDTO.setIgv( pedido.getIgv() );
        pedidoDTO.setTotal( pedido.getTotal() );
        pedidoDTO.setDetalles( detallePedidoListToDetallePedidoDTOList( pedido.getDetalles() ) );

        return pedidoDTO;
    }

    @Override
    public Pedido toEntity(PedidoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Pedido pedido = new Pedido();

        pedido.setCliente( pedidoDTOToCliente( dto ) );
        pedido.setId( dto.getId() );
        pedido.setEstado( dto.getEstado() );
        pedido.setTipoEntrega( dto.getTipoEntrega() );
        pedido.setSubtotal( dto.getSubtotal() );
        pedido.setIgv( dto.getIgv() );
        pedido.setTotal( dto.getTotal() );
        pedido.setDetalles( detallePedidoDTOListToDetallePedidoList( dto.getDetalles() ) );

        return pedido;
    }

    @Override
    public DetallePedidoDTO toDetalleDto(DetallePedido detallePedido) {
        if ( detallePedido == null ) {
            return null;
        }

        DetallePedidoDTO detallePedidoDTO = new DetallePedidoDTO();

        detallePedidoDTO.setCantidad( detallePedido.getCantidad() );
        detallePedidoDTO.setPrecioUnitario( detallePedido.getPrecioUnitario() );

        return detallePedidoDTO;
    }

    @Override
    public DetallePedido toDetalleEntity(DetallePedidoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        DetallePedido detallePedido = new DetallePedido();

        detallePedido.setCantidad( dto.getCantidad() );
        detallePedido.setPrecioUnitario( dto.getPrecioUnitario() );

        return detallePedido;
    }

    private Long pedidoClienteId(Pedido pedido) {
        if ( pedido == null ) {
            return null;
        }
        Cliente cliente = pedido.getCliente();
        if ( cliente == null ) {
            return null;
        }
        Long id = cliente.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected List<DetallePedidoDTO> detallePedidoListToDetallePedidoDTOList(List<DetallePedido> list) {
        if ( list == null ) {
            return null;
        }

        List<DetallePedidoDTO> list1 = new ArrayList<DetallePedidoDTO>( list.size() );
        for ( DetallePedido detallePedido : list ) {
            list1.add( toDetalleDto( detallePedido ) );
        }

        return list1;
    }

    protected Cliente pedidoDTOToCliente(PedidoDTO pedidoDTO) {
        if ( pedidoDTO == null ) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setId( pedidoDTO.getClienteId() );

        return cliente;
    }

    protected List<DetallePedido> detallePedidoDTOListToDetallePedidoList(List<DetallePedidoDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<DetallePedido> list1 = new ArrayList<DetallePedido>( list.size() );
        for ( DetallePedidoDTO detallePedidoDTO : list ) {
            list1.add( toDetalleEntity( detallePedidoDTO ) );
        }

        return list1;
    }
}
