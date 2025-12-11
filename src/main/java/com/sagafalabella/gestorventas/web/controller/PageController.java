package com.sagafalabella.gestorventas.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
