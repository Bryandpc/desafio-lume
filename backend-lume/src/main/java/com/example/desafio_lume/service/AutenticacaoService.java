package com.example.desafio_lume.service;

import com.example.desafio_lume.config.seguranca.JwtService;
import com.example.desafio_lume.model.request.LoginRequest;
import com.example.desafio_lume.model.request.RefreshTokenRequest;
import com.example.desafio_lume.model.response.LoginResponse;
import com.example.desafio_lume.model.RetornoApi;
import com.example.desafio_lume.model.Usuario;
import com.example.desafio_lume.utils.RetornoApiFactory;
import com.example.desafio_lume.utils.StringUtils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AutenticacaoService {

    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final RetornoApiFactory retornoApiFactory;

    public AutenticacaoService(UsuarioService usuarioService, JwtService jwtService, RetornoApiFactory retornoApiFactory) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.retornoApiFactory = retornoApiFactory;
    }

    public ResponseEntity<RetornoApi<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioService.findByNome(loginRequest.nome());

        if (StringUtils.isNullOrEmpty(usuario))
            return ResponseEntity.status(401).body(retornoApiFactory.createErrorResponse("Usuario não encontrado"));

        if (!usuarioService.isSenhaValida(loginRequest.senha(), usuario.getSenha()))
            return ResponseEntity.status(401).body(retornoApiFactory.createErrorResponse("Senha incorreta"));

        String accessToken = jwtService.gerarTokenAcesso(usuario);
        String refreshToken = jwtService.gerarRefreshToken(usuario);

        RetornoApi<LoginResponse> retorno = retornoApiFactory.createSucessResponse(
                "Login realizado com sucesso",
                new LoginResponse(accessToken, refreshToken)
        );

        return ResponseEntity.ok(retorno);
    }

    public ResponseEntity<RetornoApi<LoginResponse>> refreshToken(String refreshToken) {

        Usuario usuario = jwtService.validarRefreshEObterUsuario(refreshToken);

        if (usuario == null) {
            return ResponseEntity.status(401)
                    .body(retornoApiFactory.createErrorResponse("Refresh token inválido ou expirado."));
        }

        String novoAccessToken = jwtService.gerarTokenAcesso(usuario);
        String novoRefreshToken = jwtService.gerarRefreshToken(usuario);

        RetornoApi<LoginResponse> retorno = retornoApiFactory.createSucessResponse(
                "Token atualizado com sucesso",
                new LoginResponse(novoAccessToken, novoRefreshToken)
        );

        return ResponseEntity.ok(retorno);
    }
}
