package com.example.desafio_lume.handler;

import com.example.desafio_lume.model.RetornoApi;
import com.example.desafio_lume.utils.RetornoApiFactory;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final RetornoApiFactory retornoApiFactory;

    public GlobalExceptionHandler(RetornoApiFactory retornoApiFactory) {
        this.retornoApiFactory = retornoApiFactory;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RetornoApi<Void>> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

        String mensagem = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));

        RetornoApi<Void> body = retornoApiFactory.createErrorResponse(mensagem);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(body);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<RetornoApi<Void>> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {

        RetornoApi<Void> body = retornoApiFactory.createErrorResponse(
                "Requisição inválida: verifique os dados enviados."
        );

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(body);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<RetornoApi<Void>> handleConstraintViolation(ConstraintViolationException ex) {

        String mensagem = ex.getConstraintViolations().stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .collect(Collectors.joining("; "));

        RetornoApi<Void> body = retornoApiFactory.createErrorResponse(mensagem);

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(body);
    }
}

