package com.sagafalabella.gestorventas.infrastructure.repository.jpa;

import com.sagafalabella.gestorventas.domain.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductoJpaRepository extends JpaRepository<Producto, Long> {

    @Query("SELECT p FROM Producto p JOIN p.inventario i WHERE (:categoria IS NULL OR p.categoria = :categoria) " +
            "AND (:marca IS NULL OR p.marca = :marca) " +
            "AND (:precioMin IS NULL OR p.precio >= :precioMin) " +
            "AND (:precioMax IS NULL OR p.precio <= :precioMax) " +
            "AND (:disponible IS NULL OR i.disponible = :disponible)")
    List<Producto> search(@Param("categoria") String categoria,
                          @Param("marca") String marca,
                          @Param("precioMin") BigDecimal precioMin,
                          @Param("precioMax") BigDecimal precioMax,
                          @Param("disponible") Boolean disponible);
}
