package com.sagafalabella.gestorventas.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "proveedores")
@Getter
@Setter
public class Proveedor extends BaseEntity {

    @Column(nullable = false)
    private String nombre;

    private String contacto;
    private String telefono;
    private String email;

    @OneToMany(mappedBy = "proveedor")
    private List<Producto> productos = new ArrayList<>();
}
