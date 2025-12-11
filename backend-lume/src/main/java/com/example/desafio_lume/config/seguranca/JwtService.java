package com.example.desafio_lume.config.seguranca;

import com.example.desafio_lume.model.Usuario;
import com.example.desafio_lume.service.UsuarioService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${security.jwt.secret-key}")
    private String chaveSecreta;

    @Value("${security.jwt.expiration}")
    private long expiracaoTokenMs;

    @Value("${security.jwt.refresh-expiration}")
    private long expiracaoRefreshTokenMs;

    private SecretKey chaveAssinatura;

    private final UsuarioService usuarioService;

    public JwtService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostConstruct
    public void inicializarChave() {
        this.chaveAssinatura = Keys.hmacShaKeyFor(chaveSecreta.getBytes(StandardCharsets.UTF_8));
    }

    public Usuario validarRefreshEObterUsuario(String refreshToken) {
        try {
            if (!isRefreshToken(refreshToken) || isTokenExpirado(refreshToken)) return null;

            String nomeUsuario = obterNomeUsuario(refreshToken);

            if (nomeUsuario == null || nomeUsuario.isBlank()) return null;

            return usuarioService.findByNome(nomeUsuario);
        } catch (Exception e) {
            return null;
        }
    }

    public String gerarTokenAcesso(UserDetails usuario) {
        return gerarToken(usuario.getUsername(), expiracaoTokenMs, "acesso");
    }

    public String gerarRefreshToken(UserDetails usuario) {
        return gerarToken(usuario.getUsername(), expiracaoRefreshTokenMs, "refresh");
    }

    private String gerarToken(String nomeUsuario, long expiracaoEmMs, String tipo) {
        Date agora = new Date();
        Date dataExpiracao = new Date(agora.getTime() + expiracaoEmMs);

        return Jwts.builder()
                .subject(nomeUsuario)
                .claim("tipo", tipo)
                .issuedAt(agora)
                .expiration(dataExpiracao)
                .signWith(chaveAssinatura)
                .compact();
    }

    public String obterNomeUsuario(String token) {
        return Jwts.parser()
                .verifyWith(chaveAssinatura)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public boolean tokenValido(String token, UserDetails usuario) {
        var claims = Jwts.parser()
                .verifyWith(chaveAssinatura)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String nomeNoToken = claims.getSubject();
        Date dataExpiracao = claims.getExpiration();

        return nomeNoToken.equals(usuario.getUsername()) && dataExpiracao.after(new Date());
    }

    public boolean isRefreshToken(String token) {
        Claims claims = obterClaims(token);
        String tipo = claims.get("tipo", String.class);
        return "refresh".equalsIgnoreCase(tipo);
    }

    public boolean isTokenExpirado(String token) {
        Claims claims = obterClaims(token);
        Date expiracao = claims.getExpiration();
        return expiracao != null && expiracao.before(new Date());
    }

    private Claims obterClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(chaveSecreta.getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
