package com.sagafalabella.gestorventas.application.dto;

import com.sagafalabella.gestorventas.domain.entity.EstadoReclamo;
import lombok.Data;

@Data
public class ReclamoDTO {
    private Long id;
    private EstadoReclamo estado;
    private String motivo;
    private String rma;
}
