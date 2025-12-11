package com.sagafalabella.gestorventas.application.mapper;

import com.sagafalabella.gestorventas.application.dto.ProductoDTO;
import com.sagafalabella.gestorventas.domain.entity.Producto;
import com.sagafalabella.gestorventas.domain.entity.Proveedor;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-10T23:16:05-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.3 (Oracle Corporation)"
)
@Component
public class ProductoMapperImpl implements ProductoMapper {

    @Autowired
    private InventarioMapper inventarioMapper;

    @Override
    public ProductoDTO toDto(Producto producto) {
        if ( producto == null ) {
            return null;
        }

        ProductoDTO productoDTO = new ProductoDTO();

        productoDTO.setProveedorId( productoProveedorId( producto ) );
        productoDTO.setId( producto.getId() );
        productoDTO.setNombre( producto.getNombre() );
        productoDTO.setDescripcion( producto.getDescripcion() );
        productoDTO.setCategoria( producto.getCategoria() );
        productoDTO.setMarca( producto.getMarca() );
        productoDTO.setPrecio( producto.getPrecio() );
        productoDTO.setInventario( inventarioMapper.toDto( producto.getInventario() ) );

        return productoDTO;
    }

    @Override
    public Producto toEntity(ProductoDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Producto producto = new Producto();

        producto.setProveedor( productoDTOToProveedor( dto ) );
        producto.setId( dto.getId() );
        producto.setNombre( dto.getNombre() );
        producto.setDescripcion( dto.getDescripcion() );
        producto.setCategoria( dto.getCategoria() );
        producto.setMarca( dto.getMarca() );
        producto.setPrecio( dto.getPrecio() );
        producto.setInventario( inventarioMapper.toEntity( dto.getInventario() ) );

        return producto;
    }

    private Long productoProveedorId(Producto producto) {
        if ( producto == null ) {
            return null;
        }
        Proveedor proveedor = producto.getProveedor();
        if ( proveedor == null ) {
            return null;
        }
        Long id = proveedor.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    protected Proveedor productoDTOToProveedor(ProductoDTO productoDTO) {
        if ( productoDTO == null ) {
            return null;
        }

        Proveedor proveedor = new Proveedor();

        proveedor.setId( productoDTO.getProveedorId() );

        return proveedor;
    }
}
