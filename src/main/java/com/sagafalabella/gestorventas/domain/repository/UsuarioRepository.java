package com.sagafalabella.gestorventas.domain.repository;

import com.sagafalabella.gestorventas.domain.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository {
    Optional<Usuario> findByUsername(String username);
    Usuario save(Usuario usuario);
}
