package com.example.desafio_lume.model;

import com.example.desafio_lume.enums.SituacaoCadastro;

public class ClienteFilter {

    private Long idCliente;
    private String cpf;
    private String nome;
    private SituacaoCadastro situacao;

    public ClienteFilter() {
    }

    public ClienteFilter(Long idCliente, String cpf, String nome, SituacaoCadastro situacao) {
        this.idCliente = idCliente;
        this.cpf = cpf;
        this.nome = nome;
        this.situacao = situacao;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public SituacaoCadastro getSituacao() {
        return situacao;
    }

    public void setSituacao(SituacaoCadastro situacao) {
        this.situacao = situacao;
    }
}
