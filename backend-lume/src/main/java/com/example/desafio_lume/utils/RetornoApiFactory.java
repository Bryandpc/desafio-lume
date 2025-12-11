package com.example.desafio_lume.utils;

import com.example.desafio_lume.model.RetornoApi;
import org.springframework.stereotype.Component;

@Component
public class RetornoApiFactory {

    public <T> RetornoApi<T> createSuccessResponse(T data) {
        RetornoApi<T> retornoApi = new RetornoApi<>();
        if (!StringUtils.isNullOrEmpty(data)) retornoApi.setDados(data);
        retornoApi.setMensagem("Operação realizada com sucesso");
        retornoApi.setSucesso(true);
        return retornoApi;
    }

    public <T> RetornoApi<T> createErrorResponse(String message) {
        RetornoApi<T> retornoApi = new RetornoApi<>();
        retornoApi.setMensagem(StringUtils.isNullOrEmpty(message) ? "Erro ao realizar operação" : message);
        retornoApi.setSucesso(false);
        return retornoApi;
    }

    public <T> RetornoApi<T> createSucessResponse(String message, T data) {
        RetornoApi<T> retornoApi = new RetornoApi<>();
        retornoApi.setSucesso(true);
        retornoApi.setMensagem(StringUtils.isNullOrEmpty(message) ? "Operação realizada com sucesso" : message);
        if (!StringUtils.isNullOrEmpty(data)) retornoApi.setDados(data);
        return retornoApi;
    }

    public <T> RetornoApi<T> createSucessResponse(String message) {
        return createSucessResponse(message, null);
    }

    public <T> RetornoApi<T> createSucessResponse() {
        return createSucessResponse("Operação realizada com sucesso", null);
    }

    public <T> RetornoApi<T> createErrorResponse() {
        return createErrorResponse("Erro ao realizar operação");
    }

    public <T> RetornoApi<T> createErrorResponse(String message, T data) {
        RetornoApi<T> retornoApi = new RetornoApi<>();
        retornoApi.setMensagem(StringUtils.isNullOrEmpty(message) ? "Erro ao realizar operação" : message);
        retornoApi.setSucesso(false);
        if (!StringUtils.isNullOrEmpty(data)) retornoApi.setDados(data);
        return retornoApi;
    }
}
