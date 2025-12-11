package com.sagafalabella.gestorventas.domain.service;

import com.sagafalabella.gestorventas.application.dto.AuthRequest;
import com.sagafalabella.gestorventas.application.dto.AuthResponse;
import com.sagafalabella.gestorventas.application.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse register(RegisterRequest request);
}
