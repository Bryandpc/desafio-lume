package com.example.desafio_lume.controller;

import com.example.desafio_lume.model.RetornoApi;
import com.example.desafio_lume.model.request.LoginRequest;
import com.example.desafio_lume.model.response.LoginResponse;
import com.example.desafio_lume.service.AutenticacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Autenticacao", description = "Autenticação de usuários")
@RestController
@RequestMapping("/autenticacao_")
public class AutenticacaoController {

    private final AutenticacaoService autenticacaoService;

    public AutenticacaoController(AutenticacaoService autenticacaoService) {
        this.autenticacaoService = autenticacaoService;
    }

    @Operation(summary = "Autentica o usuario e fornece token de acesso")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida", content = @Content),
            @ApiResponse(responseCode = "401", description = "Senha incorreta", content = @Content),
            @ApiResponse(responseCode = "401", description = "Usuario não encontrado", content = @Content)
    })
    @PostMapping("/login")
    public ResponseEntity<RetornoApi<LoginResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        return autenticacaoService.login(loginRequest);
    }

    @Operation(summary = "Renova o token de acesso utilizando o refresh token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token atualizado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginResponse.class))),
            @ApiResponse(responseCode = "400", description = "Requisição inválida", content = @Content),
            @ApiResponse(responseCode = "401", description = "Refresh token inválido ou expirado", content = @Content)
    })
    @PostMapping("/refresh")
    public ResponseEntity<RetornoApi<LoginResponse>> refreshToken(@RequestBody String refreshToken) {
        return autenticacaoService.refreshToken(refreshToken);
    }
}
