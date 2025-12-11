package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ProductoDTO;
import com.sagafalabella.gestorventas.domain.entity.Producto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {InventarioMapper.class})
public interface ProductoMapper {
    @Mapping(source = "proveedor.id", target = "proveedorId")
    ProductoDTO toDto(Producto producto);

    @Mapping(source = "proveedorId", target = "proveedor.id")
    Producto toEntity(ProductoDTO dto);
}
