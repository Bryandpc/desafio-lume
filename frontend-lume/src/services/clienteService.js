import http from '../lib/http';
import { API_ENDPOINTS } from '../utils/enumUtils';

const listar = async (paginaAtual = 0, tamanhoPagina = 6, tipoBusca = '', valorBusca = '') => {
  try {
    const params = {
      page: paginaAtual,
      size: tamanhoPagina
    };

    if (valorBusca && valorBusca.trim() && tipoBusca) {
      params[tipoBusca] = valorBusca.trim();
    }

    const resposta = await http.get(API_ENDPOINTS.CLIENTE.BASE, { params });

    return {
      sucesso: resposta.data.sucesso,
      dados: resposta.data.dados,
      mensagem: resposta.data.mensagem
    };
  } catch (erro) {
    return {
      sucesso: false,
      dados: null,
      mensagem: erro.response?.data?.mensagem || 'Erro ao buscar clientes'
    };
  }
};

const buscarPorId = async (id) => {
  try {
    const resposta = await http.get(API_ENDPOINTS.CLIENTE.POR_ID(id));

    return {
      sucesso: resposta.data.sucesso,
      dados: resposta.data.dados,
      mensagem: resposta.data.mensagem
    };
  } catch (erro) {
    return {
      sucesso: false,
      dados: null,
      mensagem: erro.response?.data?.mensagem || 'Erro ao buscar cliente'
    };
  }
};

const criar = async (dadosCliente) => {
  try {
    const resposta = await http.post(API_ENDPOINTS.CLIENTE.BASE, dadosCliente);

    return {
      sucesso: resposta.data.sucesso,
      dados: resposta.data.dados,
      mensagem: resposta.data.mensagem
    };
  } catch (erro) {
    return {
      sucesso: false,
      dados: null,
      mensagem: erro.response?.data?.mensagem || 'Erro ao criar cliente'
    };
  }
};

const atualizar = async (dadosCliente) => {
  try {
    const resposta = await http.put(API_ENDPOINTS.CLIENTE.BASE, dadosCliente);

    return {
      sucesso: resposta.data.sucesso,
      dados: resposta.data.dados,
      mensagem: resposta.data.mensagem
    };
  } catch (erro) {
    return {
      sucesso: false,
      dados: null,
      mensagem: erro.response?.data?.mensagem || 'Erro ao atualizar cliente'
    };
  }
};

const deletar = async (id) => {
  try {
    const resposta = await http.delete(API_ENDPOINTS.CLIENTE.POR_ID(id));

    return {
      sucesso: resposta.data.sucesso,
      dados: resposta.data.dados,
      mensagem: resposta.data.mensagem
    };
  } catch (erro) {
    return {
      sucesso: false,
      dados: null,
      mensagem: erro.response?.data?.mensagem || 'Erro ao deletar cliente'
    };
  }
};

const clienteService = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  deletar
};

export default clienteService;

