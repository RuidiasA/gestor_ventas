package com.sagafalabella.gestorventas.application.service.impl;

import com.sagafalabella.gestorventas.application.dto.AuthRequest;
import com.sagafalabella.gestorventas.application.dto.AuthResponse;
import com.sagafalabella.gestorventas.application.dto.RegisterRequest;
import com.sagafalabella.gestorventas.domain.entity.Cliente;
import com.sagafalabella.gestorventas.domain.entity.RoleType;
import com.sagafalabella.gestorventas.domain.entity.Rol;
import com.sagafalabella.gestorventas.domain.entity.Usuario;
import com.sagafalabella.gestorventas.domain.repository.RolRepository;
import com.sagafalabella.gestorventas.domain.repository.UsuarioRepository;
import com.sagafalabella.gestorventas.domain.service.AuthService;
import com.sagafalabella.gestorventas.infrastructure.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        String token = jwtService.generateToken(usuario.getUsername(), usuario.getRoles());
        String refresh = jwtService.generateRefreshToken(usuario.getUsername(), usuario.getRoles());
        return new AuthResponse(token, refresh);
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setEmail(request.getEmail());

        Rol rolCliente = rolRepository.findByNombre(RoleType.CLIENTE)
                .orElseThrow(() -> new IllegalStateException("Rol CLIENTE no configurado"));
        usuario.getRoles().add(rolCliente);

        Cliente cliente = new Cliente();
        cliente.setNombres(request.getNombres());
        cliente.setApellidos(request.getApellidos());
        cliente.setDocumento(request.getDocumento());
        cliente.setUsuario(usuario);
        usuario.setCliente(cliente);

        usuarioRepository.save(usuario);
        String token = jwtService.generateToken(usuario.getUsername(), usuario.getRoles());
        String refresh = jwtService.generateRefreshToken(usuario.getUsername(), usuario.getRoles());
        return new AuthResponse(token, refresh);
    }
}
