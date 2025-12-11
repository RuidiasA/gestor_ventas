package com.sagafalabella.gestorventas.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reclamos")
@Getter
@Setter
public class Reclamo extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private EstadoReclamo estado;

    @Column(nullable = false)
    private String motivo;

    private String rma;

    @OneToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
}
