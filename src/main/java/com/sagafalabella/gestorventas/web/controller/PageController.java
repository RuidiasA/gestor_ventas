package com.sagafalabella.gestorventas.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * Controlador MVC exclusivo para servir páginas HTML.
 * <p>
 * - No maneja rutas /api/** (el API REST sigue en {@link AuthController} y otros controladores REST).
 * - Las vistas se encuentran en src/main/resources/templates y los recursos estáticos en src/main/resources/static.
 * - Las páginas públicas (/, /login, /register) están permitidas por Spring Security; el resto exige autenticación JWT.
 * - Para agregar nuevas vistas, cree el HTML bajo templates/ y exponga un nuevo @GetMapping sin usar el prefijo /api/.
 * </p>
 */
@Controller
public class PageController {

    @GetMapping({"/", "/index"})
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping({"/home", "/cliente/home"})
    public String home() {
        return "cliente/home";
    }

    @GetMapping("/cliente/{page}")
    public String cliente(@PathVariable String page) {
        return "cliente/" + page;
    }

    @GetMapping("/admin/{page}")
    public String admin(@PathVariable String page) {
        return "admin/" + page;
    }

    @GetMapping("/vendedor/{page}")
    public String vendedor(@PathVariable String page) {
        return "vendedor/" + page;
    }

    @GetMapping("/soporte/{page}")
    public String soporte(@PathVariable String page) {
        return "soporte/" + page;
    }
}
