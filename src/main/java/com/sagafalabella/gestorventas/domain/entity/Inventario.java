package com.sagafalabella.gestorventas.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "inventarios")
@Getter
@Setter
public class Inventario extends BaseEntity {

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Boolean disponible;

    @OneToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;
}
