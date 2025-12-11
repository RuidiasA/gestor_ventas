package com.sagafalabella.gestorventas.application.dto;

import lombok.Data;

@Data
public class ClienteDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private String documento;
    private String telefono;
    private String direccion;
    private String email;
}
