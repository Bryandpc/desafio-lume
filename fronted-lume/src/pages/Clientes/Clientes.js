import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import MenuWrapper from '../../components/MenuWrapper';
import Tabela from '../../components/Tabela';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import clienteService from '../../services/clienteService';
import { toastUtils } from '../../utils/toastUtils';
import { MaskUtils } from '../../utils/maskUtils';
import { SITUACAO_CLIENTE } from '../../utils/enumUtils';
import { APP_ROUTES } from '../../lib/routes';
import styles from '../../styles/Clientes.module.css';

const Clientes = () => {
  const navigate = useNavigate();
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [tamanhoPagina] = useState(6);
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [tipoBusca, setTipoBusca] = useState('nome');
  const [valorBusca, setValorBusca] = useState('');
  const [filtroAplicado, setFiltroAplicado] = useState({ tipo: '', valor: '' });

  useEffect(() => {
    const buscarClientes = async () => {
      setCarregando(true);
      try {
        const resultado = await clienteService.listar(
          paginaAtual, 
          tamanhoPagina, 
          filtroAplicado.tipo,
          filtroAplicado.valor
        );
        
        if (resultado.sucesso) {
          setDados(resultado.dados);
        } else {
          toastUtils.erro(resultado.mensagem);
        }
      } catch (erro) {
        toastUtils.erro('Erro ao carregar clientes');
      } finally {
        setCarregando(false);
      }
    };

    buscarClientes();
  }, [paginaAtual, tamanhoPagina, filtroAplicado]);

  const colunas = [
    {
      campo: 'idCliente',
      titulo: 'ID'
    },
    {
      campo: 'nome',
      titulo: 'Nome'
    },
    {
      campo: 'cpf',
      titulo: 'CPF',
      formatador: (valor) => MaskUtils.cpf(valor)
    },
    {
      campo: 'situacao',
      titulo: 'Situação',
      formatador: (valor) => valor === SITUACAO_CLIENTE.ATIVO ? 'Ativo' : 'Inativo'
    },
    {
      campo: 'estado',
      titulo: 'UF'
    }
  ];

  const handleEditar = (cliente) => {
    navigate(`/clientes/editar/${cliente.idCliente}`);
  };

  const handleDeletar = async (cliente) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir o cliente "${cliente.nome}"?\n\nEsta ação não pode ser desfeita.`
    );

    if (!confirmacao) {
      return;
    }

    setCarregando(true);
    try {
      const resultado = await clienteService.deletar(cliente.idCliente);
      
      if (resultado.sucesso) {
        toastUtils.sucesso('Cliente excluído com sucesso!');
        
        // Recarrega a lista após deletar
        const resultadoLista = await clienteService.listar(
          paginaAtual, 
          tamanhoPagina, 
          filtroAplicado.tipo,
          filtroAplicado.valor
        );
        
        if (resultadoLista.sucesso) {
          setDados(resultadoLista.dados);
        }
      } else {
        toastUtils.erro(resultado.mensagem);
      }
    } catch (erro) {
      toastUtils.erro('Erro ao excluir cliente');
    } finally {
      setCarregando(false);
    }
  };

  const handleMudarPagina = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  const handleNovo = () => {
    navigate(APP_ROUTES.privado.clientesNovo);
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setPaginaAtual(0); // Volta para primeira página ao buscar
    setFiltroAplicado({ tipo: tipoBusca, valor: valorBusca });
  };

  const handleLimparFiltro = () => {
    setTipoBusca('nome');
    setValorBusca('');
    setFiltroAplicado({ tipo: '', valor: '' });
    setPaginaAtual(0);
  };

  const obterPlaceholder = () => {
    switch(tipoBusca) {
      case 'idCliente':
        return 'Digite o ID do cliente...';
      case 'nome':
        return 'Digite o nome do cliente...';
      case 'cpf':
        return 'Digite o CPF (apenas números)...';
      case 'situacao':
        return 'Selecione a situação...';
      default:
        return 'Digite para buscar...';
    }
  };

  return (
    <MenuWrapper>
      <Loading carregando={carregando} mensagem="Carregando clientes..." />
      
      <div className={styles.container}>
        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>Clientes</h1>
          <Button variant="primary" onClick={handleNovo}>
            <IoMdAdd size={20} />
            Novo Cliente
          </Button>
        </div>

        <form onSubmit={handleBuscar} className={styles.filtroContainer}>
          <select 
            className={styles.selectFiltro}
            value={tipoBusca}
            onChange={(e) => {
              setTipoBusca(e.target.value);
              // Limpa o valor ao trocar para situação
              if (e.target.value === 'situacao') {
                setValorBusca('');
              }
            }}
            disabled={carregando}
          >
            <option value="nome">Nome</option>
            <option value="cpf">CPF</option>
            <option value="idCliente">ID</option>
            <option value="situacao">Situação</option>
          </select>
          
          {tipoBusca === 'situacao' ? (
            <select
              className={styles.inputFiltro}
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
              disabled={carregando}
            >
              <option value="">Selecione a situação...</option>
              <option value={SITUACAO_CLIENTE.ATIVO}>Ativo</option>
              <option value={SITUACAO_CLIENTE.INATIVO}>Inativo</option>
            </select>
          ) : (
            <input
              type="text"
              className={styles.inputFiltro}
              placeholder={obterPlaceholder()}
              value={valorBusca}
              onChange={(e) => setValorBusca(e.target.value)}
              disabled={carregando}
            />
          )}
          
          <Button type="submit" variant="primary" disabled={carregando}>
            Buscar
          </Button>
          
          {filtroAplicado.valor && (
            <Button type="button" variant="secondary" onClick={handleLimparFiltro} disabled={carregando}>
              Limpar
            </Button>
          )}
        </form>

        <Tabela
          dados={dados?.content || []}
          colunas={colunas}
          totalRegistros={dados?.totalElements || 0}
          paginaAtual={paginaAtual}
          tamanhoPagina={tamanhoPagina}
          onMudarPagina={handleMudarPagina}
          onEditar={handleEditar}
          onDeletar={handleDeletar}
          temAcao={true}
          carregando={carregando}
          mensagemVazia="Nenhum cliente cadastrado!"
        />
      </div>
    </MenuWrapper>
  );
};

export default Clientes;
