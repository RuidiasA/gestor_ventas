package com.sagafalabella.gestorventas.application.service.impl;

import com.sagafalabella.gestorventas.application.dto.ProductoDTO;
import com.sagafalabella.gestorventas.application.mapper.ProductoMapper;
import com.sagafalabella.gestorventas.domain.entity.Inventario;
import com.sagafalabella.gestorventas.domain.entity.Producto;
import com.sagafalabella.gestorventas.domain.entity.Proveedor;
import com.sagafalabella.gestorventas.domain.repository.InventarioRepository;
import com.sagafalabella.gestorventas.domain.repository.ProductoRepository;
import com.sagafalabella.gestorventas.domain.repository.ProveedorRepository;
import com.sagafalabella.gestorventas.domain.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;
    private final InventarioRepository inventarioRepository;
    private final ProductoMapper productoMapper;

    @Override
    @Transactional
    public ProductoDTO create(ProductoDTO dto) {
        Producto producto = productoMapper.toEntity(dto);
        Proveedor proveedor = proveedorRepository.findById(dto.getProveedorId())
                .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado"));
        producto.setProveedor(proveedor);

        if (dto.getInventario() != null) {
            Inventario inventario = new Inventario();
            inventario.setStock(dto.getInventario().getStock());
            inventario.setDisponible(dto.getInventario().getDisponible());
            inventario.setProducto(producto);
            producto.setInventario(inventario);
        }

        return productoMapper.toDto(productoRepository.save(producto));
    }

    @Override
    public List<ProductoDTO> findAll(String categoria, String marca, String precioMin, String precioMax, Boolean disponible) {
        BigDecimal min = precioMin != null ? new BigDecimal(precioMin) : null;
        BigDecimal max = precioMax != null ? new BigDecimal(precioMax) : null;
        return productoRepository.findByFilters(categoria, marca, min, max, disponible)
                .stream()
                .map(productoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductoDTO update(Long id, ProductoDTO dto) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado"));
        producto.setNombre(dto.getNombre());
        producto.setDescripcion(dto.getDescripcion());
        producto.setCategoria(dto.getCategoria());
        producto.setMarca(dto.getMarca());
        producto.setPrecio(dto.getPrecio());

        if (dto.getProveedorId() != null) {
            Proveedor proveedor = proveedorRepository.findById(dto.getProveedorId())
                    .orElseThrow(() -> new IllegalArgumentException("Proveedor no encontrado"));
            producto.setProveedor(proveedor);
        }

        if (dto.getInventario() != null) {
            Inventario inventario = inventarioRepository.findByProductoId(producto.getId())
                    .orElseGet(Inventario::new);
            inventario.setProducto(producto);
            inventario.setStock(dto.getInventario().getStock());
            inventario.setDisponible(dto.getInventario().getDisponible());
            inventarioRepository.save(inventario);
            producto.setInventario(inventario);
        }

        return productoMapper.toDto(productoRepository.save(producto));
    }

    @Override
    public void delete(Long id) {
        productoRepository.deleteById(id);
    }
}
