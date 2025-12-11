package com.example.desafio_lume.model.response;

import com.example.desafio_lume.model.Cliente;

public record ClienteResponse(
        Long idCliente,
        String nome,
        String cpf,
        String logradouro,
        String bairro,
        String cidade,
        String estado,
        String cep,
        String situacao
) {
    public static ClienteResponse fromEntity(Cliente cliente) {
        return new ClienteResponse(
                cliente.getIdCliente(),
                cliente.getNome(),
                cliente.getCpf(),
                cliente.getLogradouro(),
                cliente.getBairro(),
                cliente.getCidade(),
                cliente.getEstado(),
                cliente.getCep(),
                cliente.getSituacao() != null ? cliente.getSituacao().name() : null
        );
    }
}
