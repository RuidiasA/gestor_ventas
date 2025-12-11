package com.sagafalabella.gestorventas.application.dto;

import lombok.Data;

@Data
public class ProveedorDTO {
    private Long id;
    private String nombre;
    private String contacto;
    private String telefono;
    private String email;
}
