package com.sagafalabella.gestorventas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GestorVentasApplication {
    public static void main(String[] args) {
        SpringApplication.run(GestorVentasApplication.class, args);
    }
}
