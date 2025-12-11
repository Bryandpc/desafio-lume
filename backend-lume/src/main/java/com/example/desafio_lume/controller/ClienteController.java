package com.example.desafio_lume.controller;

import com.example.desafio_lume.model.ClienteFilter;
import com.example.desafio_lume.model.RetornoApi;
import com.example.desafio_lume.model.request.ClienteAtualizacaoRequest;
import com.example.desafio_lume.model.request.ClienteCadastroRequest;
import com.example.desafio_lume.model.response.ClienteResponse;
import com.example.desafio_lume.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Clientes", description = "Operações de CRUD de clientes")
@RestController
@RequestMapping("/cliente_")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @Operation(summary = "Cria um novo cliente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Cliente criado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ClienteResponse.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos para criação do cliente", content = @Content),
            @ApiResponse(responseCode = "409", description = "Cpf já cadastrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RetornoApi.class)))
    })
    @PostMapping
    public ResponseEntity<RetornoApi<ClienteResponse>> criarCliente(@Valid @RequestBody ClienteCadastroRequest clienteCadastroRequest) {
        return clienteService.criar(clienteCadastroRequest);
    }

    @Operation(summary = "Atualiza os dados de um cliente existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ClienteResponse.class))),
            @ApiResponse(responseCode = "400", description = "Dados inválidos para atualização", content = @Content),
            @ApiResponse(responseCode = "400", description = "Situação inválida.", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content),
            @ApiResponse(responseCode = "409", description = "Cpf já cadastrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = RetornoApi.class)))
    })
    @PutMapping
    public ResponseEntity<RetornoApi<ClienteResponse>> atualizarCliente(@Valid @RequestBody ClienteAtualizacaoRequest clienteAtualizacaoRequest) {
        return clienteService.atualizar(clienteAtualizacaoRequest);
    }

    @Operation(summary = "Busca um cliente pelo identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente encontrado", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ClienteResponse.class))),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content)
    })
    @GetMapping("/{idCliente}")
    public ResponseEntity<RetornoApi<ClienteResponse>> buscarPorId(@PathVariable Long idCliente) {
        return clienteService.buscarPorId(idCliente);
    }

    @Operation(summary = "Lista todos os clientes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de clientes retornada com sucesso", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ClienteResponse.class))))
    })
    @GetMapping
    public ResponseEntity<RetornoApi<Page<ClienteResponse>>> listarClientes(
            @ModelAttribute ClienteFilter clienteFilter,
            @PageableDefault(size = 10, sort = "nome") Pageable pageable) {
        return clienteService.listar(clienteFilter, pageable);
    }

    @Operation(summary = "Exclui um cliente pelo identificador")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cliente excluído com sucesso", content = @Content),
            @ApiResponse(responseCode = "404", description = "Cliente não encontrado", content = @Content)
    })
    @DeleteMapping("/{idCliente}")
    public ResponseEntity<RetornoApi<Void>> excluirCliente(@PathVariable Long idCliente) {
        return clienteService.excluir(idCliente);
    }
}
