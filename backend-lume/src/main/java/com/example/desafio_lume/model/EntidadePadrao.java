package com.example.desafio_lume.model;

import com.example.desafio_lume.utils.DataUtils;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.LocalDateTime;
import java.time.ZoneId;

@MappedSuperclass
public abstract class EntidadePadrao<T> {

    @Column(nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dataCriacao;

    @Column(nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dataAlteracao;

    @PrePersist
    public void aoCriar() {
        LocalDateTime agora = DataUtils.retornaDataAgora();
        this.dataCriacao = agora;
        this.dataAlteracao = agora;
    }

    @PreUpdate
    public void aoAtualizar() {
        this.dataAlteracao = DataUtils.retornaDataAgora();
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataAlteracao() {
        return dataAlteracao;
    }

    public void setDataAlteracao(LocalDateTime dataAlteracao) {
        this.dataAlteracao = dataAlteracao;
    }
}
