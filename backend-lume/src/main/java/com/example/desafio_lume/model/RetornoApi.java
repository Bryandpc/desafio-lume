package com.example.desafio_lume.model;

public class RetornoApi<T> {

    private T dados;
    private String mensagem;
    private boolean sucesso;

    public RetornoApi() {
    }

    public RetornoApi(T dados, String mensagem, boolean sucesso) {
        this.dados = dados;
        this.mensagem = mensagem;
        this.sucesso = sucesso;
    }

    public T getDados() {
        return dados;
    }

    public void setDados(T dados) {
        this.dados = dados;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public boolean isSucesso() {
        return sucesso;
    }

    public void setSucesso(boolean sucesso) {
        this.sucesso = sucesso;
    }
}
