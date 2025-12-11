package com.sagafalabella.gestorventas.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PagoRequest {
    @NotBlank
    private String numeroTarjeta;
    @NotBlank
    private String titular;
    @NotBlank
    private String cvv;
}
