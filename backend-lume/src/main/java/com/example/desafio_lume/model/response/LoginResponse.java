package com.example.desafio_lume.model.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta do login do usuário")
public record LoginResponse(

    @Schema(description = "Token do usuario", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    String token,

    @Schema(description = "Refresh token do usuario", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    String refreshToken
) {}
