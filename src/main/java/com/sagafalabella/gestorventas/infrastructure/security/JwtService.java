package com.sagafalabella.gestorventas.infrastructure.security;

import com.sagafalabella.gestorventas.domain.entity.Rol;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class JwtService {

    @Value("${app.security.jwt.secret}")
    private String secret;

    @Value("${app.security.jwt.expiration}")
    private long expiration;

    @Value("${app.security.jwt.refreshExpiration}")
    private long refreshExpiration;

    public String generateToken(String username, Set<Rol> roles) {
        return buildToken(username, roles, expiration);
    }

    public String generateRefreshToken(String username, Set<Rol> roles) {
        return buildToken(username, roles, refreshExpiration);
    }

    private String buildToken(String username, Set<Rol> roles, long expirationTime) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationTime);
        String rolesClaim = roles.stream()
                .map(r -> r.getNombre().name())
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", rolesClaim)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
