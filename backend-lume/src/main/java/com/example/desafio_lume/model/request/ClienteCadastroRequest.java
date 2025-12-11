package com.example.desafio_lume.model.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

@Schema(description = "Dados para criação de cliente")
public record ClienteCadastroRequest(

        @Schema(description = "Nome do cliente", example = "Empresa XPTO")
        @NotBlank(message = "Nome é obrigatório")
        String nome,

        @Schema(description = "CPF do cliente", example = "123.456.789-00")
        @NotBlank(message = "CPF é obrigatório")
        @CPF(message = "CPF inválido")
        String cpf, // Validação mais forte de CPF ficará também no front, aqui não iremos salvar com pontuação

        @Schema(description = "Logradouro", example = "Rua das Flores, 123")
        @NotBlank(message = "Logradouro é obrigatório")
        @Size(max = 200, message = "Logradouro não pode ter mais que 200 caracteres")
        String logradouro,

        @Schema(description = "Bairro", example = "Centro")
        @NotBlank(message = "Bairro é obrigatório")
        @Size(max = 20, message = "Bairro não pode ter mais que 20 caracteres")
        String bairro,

        @Schema(description = "Cidade", example = "São Paulo")
        @NotBlank(message = "Cidade é obrigatória")
        @Size(max = 100, message = "Cidade não pode ter mais que 100 caracteres")
        String cidade,

        @Schema(description = "Estado (UF)", example = "SP")
        @NotBlank(message = "Estado é obrigatório")
        @Size(min = 2, max = 2, message = "Estado deve ter 2 caracteres (UF)")
        String estado,

        @Schema(description = "CEP", example = "01001-000")
        @NotBlank(message = "CEP é obrigatório")
        @Size(max = 10, message = "CEP não pode ter mais que 10 caracteres")
        String cep
) {}

