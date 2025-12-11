package com.example.desafio_lume.model;

import com.example.desafio_lume.enums.SituacaoCadastro;
import com.example.desafio_lume.utils.StringUtils;
import jakarta.persistence.*;
import jakarta.validation.Valid;

@Entity
@Table(name = "cliente")
public class Cliente extends EntidadePadrao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCliente;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100, unique = true)
    private String cpf;

    @Column(nullable = false, length = 200)
    private String logradouro;

    @Column(nullable = false, length = 20)
    private String bairro;

    @Column(nullable = false, length = 100)
    private String cidade;

    @Column(nullable = false, length = 2)
    private String estado;

    @Column(nullable = false, length = 10)
    private String cep;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao", nullable = false, length = 20)
    private SituacaoCadastro situacao;

    @PrePersist
    public void prePersist() {
        if (StringUtils.isNullOrEmpty(this.situacao)) this.situacao = SituacaoCadastro.ATIVO;
    }

    public Cliente() {
    }

    public Cliente(Long idCliente, String nome, String cpf, String logradouro, String bairro, String cidade, String estado, String cep, SituacaoCadastro situacao) {
        this.idCliente = idCliente;
        this.nome = nome;
        setCpf(cpf);
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
        this.situacao = situacao;
    }

    public Cliente(String nome, String cpf, String logradouro, String bairro, String cidade, String estado, String cep) {
        this.nome = nome;
        setCpf(cpf);
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.cep = cep;
    }

    public Long getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(Long idCliente) {
        this.idCliente = idCliente;
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = StringUtils.normalizarString(cpf);
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }
}
