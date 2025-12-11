package com.sagafalabella.gestorventas.infrastructure.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configuración de seguridad centrada en dos flujos independientes:
 *
 * <ul>
 *     <li>Flujo MVC (HTML): páginas públicas (/ , /login, /register) y vistas protegidas que usan el mismo JWT
 *     que las peticiones REST. Los recursos estáticos en /css, /js y /img siempre son públicos.</li>
 *     <li>API REST (/api/**): el endpoint /api/v1/auth/** permanece público para emitir/registrar usuarios con JWT.
 *     El resto del API requiere el token Bearer.</li>
 * </ul>
 *
 * El filtro {@link JwtAuthenticationFilter} se registra antes del UsernamePasswordAuthenticationFilter para poblar el
 * contexto de seguridad tanto en peticiones REST como al consumir vistas HTML protegidas.
 */
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        // RUTAS PÚBLICAS DEL FRONTEND
                        .requestMatchers(
                                "/", "/index", "/home",
                                "/login", "/register"
                        ).permitAll()

                        // RUTAS MVC DINÁMICAS PÚBLICAS (como /cliente/catalogo)
                        .requestMatchers(
                                "/cliente/**",
                                "/vendedor/**",
                                "/admin/**",
                                "/soporte/**"
                        ).permitAll()

                        // RECURSOS ESTÁTICOS
                        .requestMatchers(
                                "/css/**", "/js/**", "/img/**", "/public/**"
                        ).permitAll()

                        // API DE AUTENTICACIÓN SIN JWT
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // SWAGGER
                        .requestMatchers(
                                "/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html"
                        ).permitAll()

                        // TODAS LAS DEMÁS RUTAS REQUIEREN JWT
                        .anyRequest().authenticated()
                )
                // FILTRO JWT
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
