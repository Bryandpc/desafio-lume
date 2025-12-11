package com.example.desafio_lume.repository;

import com.example.desafio_lume.enums.SituacaoCadastro;
import com.example.desafio_lume.model.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRespository extends JpaRepository<Cliente, Long> {

    Cliente findByIdCliente(Long idCliente);
    boolean existsByCpf(String cpf);

    @Query("""
           SELECT c
           FROM Cliente c
           WHERE (:nome IS NULL OR LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%')))
             AND (:idCliente IS NULL OR c.idCliente = :idCliente)
             AND (:cpf IS NULL OR LOWER(c.cpf) LIKE LOWER(CONCAT('%', :cpf, '%')))
             AND (:situacao IS NULL OR c.situacao = :situacao)
           """)
    Page<Cliente> buscarFiltrado(
            @Param("idCliente") Long idCliente,
            @Param("nome") String nome,
            @Param("cpf") String cpf,
            @Param("situacao") SituacaoCadastro situacao,
            Pageable pageable);
}
