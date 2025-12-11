package com.sagafalabella.gestorventas.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "comprobantes")
@Getter
@Setter
public class Comprobante extends BaseEntity {

    @Column(nullable = false)
    private String numero;

    @Column(nullable = false)
    private BigDecimal monto;

    @OneToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;
}
