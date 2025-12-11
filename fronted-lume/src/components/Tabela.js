import React from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosWarning } from 'react-icons/io';
import { MdEdit, MdDelete } from 'react-icons/md';
import styles from '../styles/Tabela.module.css';

export default function Tabela({
    dados = [],
    colunas = [],
    totalRegistros = 0,
    paginaAtual = 0,
    tamanhoPagina = 10,
    onMudarPagina,
    onEditar,
    onDeletar,
    temAcao = true,
    carregando = false,
    mensagemVazia = "Nenhum dado cadastrado!"
}) {
    const inicio = dados.length > 0 ? paginaAtual * tamanhoPagina + 1 : 0;
    const fim = dados.length > 0 ? Math.min(inicio + tamanhoPagina - 1, totalRegistros) : 0;
    
    const totalPaginas = Math.ceil(totalRegistros / tamanhoPagina) || 1;
    const paginaAtualFormatada = paginaAtual + 1;
    
    const handlePaginaAnterior = () => {
        if (paginaAtual > 0 && onMudarPagina) {
            onMudarPagina(paginaAtual - 1);
        }
    };
    
    const handleProximaPagina = () => {
        if (paginaAtual < totalPaginas - 1 && onMudarPagina) {
            onMudarPagina(paginaAtual + 1);
        }
    };
    
    const obterValorCampo = (obj, campo) => {
        if (!campo || !obj) return null;
        
        if (!campo.includes('.')) {
            return obj[campo];
        }
        
        const partes = campo.split('.');
        let valor = obj;
        
        for (const parte of partes) {
            if (valor && typeof valor === 'object' && parte in valor) {
                valor = valor[parte];
            } else {
                return null;
            }
        }
        
        return valor;
    };

    const renderizarValorCelula = (item, coluna) => {
        const valor = obterValorCampo(item, coluna.campo);
        
        if (coluna.render) {
            return coluna.render(valor, item);
        }
        
        if (coluna.formatador) {
            return coluna.formatador(valor, item);
        }
        
        return valor;
    };

    const EstadoVazio = () => {
        return (
            <div className={styles.estadoVazio}>
                <IoIosWarning className={styles.iconeEstadoVazio} />
                <p className={styles.mensagemEstadoVazio}>{mensagemVazia}</p>
            </div>
        );
    };
    
    if (dados.length === 0 && totalRegistros === 0) {
        return (
            <>
                <div className={`${styles.containerTabela} ${carregando ? styles.carregando : ''}`}>
                    <div className={styles.estadoVazioContainer}>
                        <EstadoVazio />
                    </div>
                </div>
                <div className={styles.espacadorInferior}></div>
            </>
        );
    }
    
    return (
        <>
            <div className={`${styles.containerTabela} ${carregando ? styles.carregando : ''}`}>
                <div className={styles.cabecalhoTabela}>
                    <div className={styles.infoPaginacao}>
                        {totalRegistros > 0 ? `${inicio} - ${fim} de ${totalRegistros}` : "Sem registros"}
                    </div>
                    <div className={styles.controlesPaginacao}>
                        <span className={styles.numeroPagina}>
                            Página {paginaAtualFormatada} de {totalPaginas}
                        </span>
                        <button 
                            type="button"
                            className={styles.botaoNavegacao}
                            onClick={handlePaginaAnterior}
                            disabled={paginaAtual <= 0}
                            aria-label="Página anterior"
                        >
                            <IoIosArrowBack />
                        </button>
                        <button 
                            type="button"
                            className={styles.botaoNavegacao}
                            onClick={handleProximaPagina}
                            disabled={paginaAtual >= totalPaginas - 1 || totalRegistros === 0}
                            aria-label="Próxima página"
                        >
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>

                <hr className={styles.divisorFiltro} />

                <table className={styles.tabela}>
                    <thead>
                        <tr>
                            {temAcao && (
                                <th className={`${styles.celulaAcao} ${styles.cabecalhoAcao}`}>
                                    AÇÃO
                                </th>
                            )}
                            {colunas.map((coluna) => (
                                <th
                                    key={coluna.campo}
                                    className={styles.cabecalhoColuna}
                                >
                                    {coluna.titulo.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.length > 0 ? (
                            dados.map((item, index) => (
                                <tr key={item.id || index}>
                                    {temAcao && (
                                        <td className={styles.celulaAcao}>
                                            <div className={styles.acoesContainer}>
                                                <button 
                                                    type="button"
                                                    className={styles.botaoAcao}
                                                    onClick={() => onEditar?.(item)}
                                                    aria-label="Editar registro"
                                                    title="Editar"
                                                >
                                                    <MdEdit size="1.1em" />
                                                </button>
                                                {onDeletar && (
                                                    <button 
                                                        type="button"
                                                        className={`${styles.botaoAcao} ${styles.botaoDeletar}`}
                                                        onClick={() => onDeletar?.(item)}
                                                        aria-label="Deletar registro"
                                                        title="Deletar"
                                                    >
                                                        <MdDelete size="1.1em" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                    {colunas.map((coluna) => (
                                        <td
                                            key={coluna.campo}
                                            className={styles.celulaColuna}
                                        >
                                            {renderizarValorCelula(item, coluna)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={colunas.length + (temAcao ? 1 : 0)} className={styles.semDados}>
                                    <EstadoVazio />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className={styles.espacadorInferior}></div>
        </>
    );
}
