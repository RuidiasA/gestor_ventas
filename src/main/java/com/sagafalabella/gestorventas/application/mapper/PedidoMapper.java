package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.DetallePedidoDTO;
import com.sagafalabella.gestorventas.application.dto.PedidoDTO;
import com.sagafalabella.gestorventas.domain.entity.DetallePedido;
import com.sagafalabella.gestorventas.domain.entity.Pedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PedidoMapper {
    @Mapping(source = "cliente.id", target = "clienteId")
    PedidoDTO toDto(Pedido pedido);

    @Mapping(source = "clienteId", target = "cliente.id")
    Pedido toEntity(PedidoDTO dto);

    DetallePedidoDTO toDetalleDto(DetallePedido detallePedido);
    DetallePedido toDetalleEntity(DetallePedidoDTO dto);
}
