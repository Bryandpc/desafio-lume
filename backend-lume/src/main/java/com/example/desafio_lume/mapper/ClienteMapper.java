package com.example.desafio_lume.mapper;

import com.example.desafio_lume.model.Cliente;
import com.example.desafio_lume.model.request.ClienteAtualizacaoRequest;
import com.example.desafio_lume.model.request.ClienteCadastroRequest;

public class ClienteMapper {

    public Cliente fromClienteCadastroRequest(ClienteCadastroRequest request) {
        if (request == null) return null;

        return new Cliente(
            request.nome(),
            request.cpf(),
            request.logradouro(),
            request.bairro(),
            request.cidade(),
            request.estado(),
            request.cep()
        );
    }

    public Cliente fromClienteAtualizacaoRequest(ClienteAtualizacaoRequest request) {
        if (request == null) return null;

        return new Cliente(
            request.id(),
            request.nome(),
            request.cpf(),
            request.logradouro(),
            request.bairro(),
            request.cidade(),
            request.estado(),
            request.cep(),
            request.situacao()
        );
    }

    public Cliente fromClienteRequest(Object request) {
        if (request instanceof ClienteCadastroRequest) {
            return fromClienteCadastroRequest((ClienteCadastroRequest) request);
        } else if (request instanceof ClienteAtualizacaoRequest) {
            return fromClienteAtualizacaoRequest((ClienteAtualizacaoRequest) request);
        }
        return null;
    }
}
