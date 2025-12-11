package com.sagafalabella.gestorventas.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

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

    @GetMapping("/cliente/home")
    public String clienteHome() {
        return "cliente/home";
    }

    @GetMapping("/cliente/catalogo")
    public String clienteCatalogo() {
        return "cliente/catalogo";
    }

    @GetMapping("/cliente/producto")
    public String clienteProducto() {
        return "cliente/producto";
    }

    @GetMapping("/cliente/carrito")
    public String clienteCarrito() {
        return "cliente/carrito";
    }

    @GetMapping("/cliente/checkout")
    public String clienteCheckout() {
        return "cliente/checkout";
    }

    @GetMapping("/cliente/pedidos")
    public String clientePedidos() {
        return "cliente/pedidos";
    }

    @GetMapping("/cliente/pedido-detalle")
    public String clientePedidoDetalle() {
        return "cliente/pedido-detalle";
    }

    @GetMapping("/cliente/reclamos")
    public String clienteReclamos() {
        return "cliente/reclamos";
    }

    @GetMapping("/cliente/reclamo-nuevo")
    public String clienteReclamoNuevo() {
        return "cliente/reclamo-nuevo";
    }

    @GetMapping("/vendedor/panel")
    public String vendedorPanel() {
        return "vendedor/panel";
    }

    @GetMapping("/vendedor/pedidos")
    public String vendedorPedidos() {
        return "vendedor/pedidos";
    }

    @GetMapping("/vendedor/pedido-detalle")
    public String vendedorPedidoDetalle() {
        return "vendedor/pedido-detalle";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/admin/productos")
    public String adminProductos() {
        return "admin/productos";
    }

    @GetMapping("/admin/producto-form")
    public String adminProductoForm() {
        return "admin/producto-form";
    }

    @GetMapping("/admin/proveedores")
    public String adminProveedores() {
        return "admin/proveedores";
    }

    @GetMapping("/admin/proveedor-form")
    public String adminProveedorForm() {
        return "admin/proveedor-form";
    }

    @GetMapping("/admin/inventario")
    public String adminInventario() {
        return "admin/inventario";
    }

    @GetMapping("/admin/usuarios")
    public String adminUsuarios() {
        return "admin/usuarios";
    }

    @GetMapping("/admin/reportes")
    public String adminReportes() {
        return "admin/reportes";
    }

    @GetMapping("/soporte/panel")
    public String soportePanel() {
        return "soporte/panel";
    }

    @GetMapping("/soporte/reclamos")
    public String soporteReclamos() {
        return "soporte/reclamos";
    }

    @GetMapping("/soporte/reclamo-detalle")
    public String soporteReclamoDetalle() {
        return "soporte/reclamo-detalle";
    }
}
