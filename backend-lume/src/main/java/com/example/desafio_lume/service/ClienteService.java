package com.example.desafio_lume.service;

import com.example.desafio_lume.enums.SituacaoCadastro;
import com.example.desafio_lume.mapper.ClienteMapper;
import com.example.desafio_lume.model.Cliente;
import com.example.desafio_lume.model.ClienteFilter;
import com.example.desafio_lume.model.RetornoApi;
import com.example.desafio_lume.model.request.ClienteAtualizacaoRequest;
import com.example.desafio_lume.model.request.ClienteCadastroRequest;
import com.example.desafio_lume.model.response.ClienteResponse;
import com.example.desafio_lume.repository.ClienteRespository;
import com.example.desafio_lume.utils.RetornoApiFactory;
import com.example.desafio_lume.utils.StringUtils;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    private final ClienteRespository clienteRespository;
    private final ClienteMapper clienteMapper = new ClienteMapper();

    public ClienteService(ClienteRespository clienteRespository, RetornoApiFactory retornoApiFactory) {
        this.clienteRespository = clienteRespository;
        this.retornoApiFactory = retornoApiFactory;
    }

    public ResponseEntity<RetornoApi<ClienteResponse>> criar(@Valid ClienteCadastroRequest clienteCadastroRequest) {
        Cliente cliente = clienteMapper.fromClienteRequest(clienteCadastroRequest);

        if (clienteRespository.existsByCpf(cliente.getCpf()))
            return ResponseEntity.status(HttpStatus.CONFLICT).body(retornoApiFactory.createErrorResponse("Cpf já cadastrado."));

        cliente = clienteRespository.save(cliente);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(retornoApiFactory.createSuccessResponse(ClienteResponse.fromEntity(cliente)));

    }
    private final RetornoApiFactory retornoApiFactory;

    public ResponseEntity<RetornoApi<ClienteResponse>> atualizar(@Valid ClienteAtualizacaoRequest clienteAtualizacaoRequest) {
        Cliente clienteBanco = clienteRespository.findByIdCliente(clienteAtualizacaoRequest.id());

        if (!StringUtils.isSituacaoValida(clienteAtualizacaoRequest.situacao()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(retornoApiFactory.createErrorResponse("Situação inválida."));

        if (StringUtils.isNullOrEmpty(clienteBanco))
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(retornoApiFactory.createErrorResponse("Cliente não encontrado para o identificador: " + clienteAtualizacaoRequest.id()));
        
        if (!StringUtils.areStringsIguais(clienteBanco.getCpf(), clienteAtualizacaoRequest.cpf()) && clienteRespository.existsByCpf(clienteAtualizacaoRequest.cpf()))
            return ResponseEntity.status(HttpStatus.CONFLICT).body(retornoApiFactory.createErrorResponse("Cpf já cadastrado."));

        Cliente cliente = clienteMapper.fromClienteRequest(clienteAtualizacaoRequest);
        
        BeanUtils.copyProperties(
                cliente,
                clienteBanco,
                "idCliente"
        );

        Cliente clienteAtualizado = clienteRespository.save(clienteBanco);
        
        return ResponseEntity.ok()
                .body(retornoApiFactory.createSuccessResponse(ClienteResponse.fromEntity(clienteAtualizado)));
    }

    public ResponseEntity<RetornoApi<ClienteResponse>> buscarPorId(Long idCliente) {
        Cliente cliente = clienteRespository.findByIdCliente(idCliente);

        if (StringUtils.isNullOrEmpty(cliente)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(retornoApiFactory.createErrorResponse("Cliente não encontrado para o identificador: " + idCliente));
        }

        return ResponseEntity.ok()
                .body(retornoApiFactory.createSuccessResponse(ClienteResponse.fromEntity(cliente)));
    }

    public ResponseEntity<RetornoApi<Page<ClienteResponse>>> listar(ClienteFilter clienteFilter, Pageable pageable) {

        Long idCliente = clienteFilter.getIdCliente();
        String nome = StringUtils.normalizarString(clienteFilter.getNome());
        String cpf = StringUtils.normalizarString(clienteFilter.getCpf());

        Page<Cliente> clientes = clienteRespository.buscarFiltrado(
                idCliente,
                nome,
                cpf,
                clienteFilter.getSituacao(),
                pageable
        );

        if (clientes.isEmpty()) {
            return ResponseEntity.ok()
                    .body(retornoApiFactory.createSucessResponse("Nenhum cliente encontrado com os critérios informados.", Page.empty()));
        }

        Page<ClienteResponse> clienteResponses = clientes.map(ClienteResponse::fromEntity);

        return ResponseEntity.ok()
                .body(retornoApiFactory.createSuccessResponse(clienteResponses));
    }

    public ResponseEntity<RetornoApi<Void>> excluir(Long idCliente) {
        Cliente cliente = clienteRespository.findByIdCliente(idCliente);

        if (StringUtils.isNullOrEmpty(cliente)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(retornoApiFactory.createErrorResponse("Cliente não encontrado para o identificador: " + idCliente));
        }

        clienteRespository.delete(cliente);
        return ResponseEntity.ok().body(retornoApiFactory.createSuccessResponse(null));
    }
}
