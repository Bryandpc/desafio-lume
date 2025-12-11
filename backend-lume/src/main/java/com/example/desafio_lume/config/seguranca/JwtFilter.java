package com.example.desafio_lume.config.seguranca;

import ch.qos.logback.core.util.StringUtil;
import com.example.desafio_lume.utils.StringUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsuarioDetailsService usuarioDetailsService;

    public JwtFilter(JwtService jwtService, UsuarioDetailsService usuarioDetailsService) {
        this.jwtService = jwtService;
        this.usuarioDetailsService = usuarioDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain filter
    ) throws ServletException, IOException {
        String header = req.getHeader("Authorization");

        if (StringUtils.isNullOrEmpty(header) || !header.startsWith("Bearer ")) {
            filter.doFilter(req, res);
            return;
        }

        String token = header.substring(7).trim();

        String nomeUsuario;
        try {
            nomeUsuario = jwtService.obterNomeUsuario(token);
        } catch (Exception e) {
            filter.doFilter(req, res);
            return;
        }

        if (!StringUtils.isNullOrEmpty(nomeUsuario) && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails usuario = usuarioDetailsService.loadUserByUsername(nomeUsuario);

            if (!jwtService.tokenValido(token, usuario))
                throw new BadCredentialsException("Token inválido");

            if (!StringUtils.isNullOrEmpty(usuario)) {
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                            usuario,
                  null,
                            usuario.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filter.doFilter(req, res);
    }
}
