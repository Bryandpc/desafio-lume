package com.example.desafio_lume.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dados para renovação do token de acesso")
public record RefreshTokenRequest(

        @Schema(description = "Refresh token válido", example = "eyJhbGciOiJIUzUxMiJ9...")
        @NotBlank(message = "Refresh token é obrigatório")
        String refreshToken
) {}