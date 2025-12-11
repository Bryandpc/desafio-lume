package com.example.desafio_lume.model.request;

import jakarta.validation.constraints.NotBlank;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Credenciais de login do usuário")
public record LoginRequest(

        @Schema(description = "Nome de usuário", example = "admin")
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @Schema(description = "Senha do usuário", example = "123")
        @NotBlank(message = "Senha é obrigatório")
        String senha
) {}

