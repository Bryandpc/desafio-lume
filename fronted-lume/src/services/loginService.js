import http from '../lib/http';
import { CacheUtils, CHAVES_CACHE } from '../utils/cacheUtils';
import { API_ENDPOINTS } from '../utils/enumUtils';

const login = async (nome, senha) => {
  try {
    const resposta = await http.post(API_ENDPOINTS.AUTENTICACAO.LOGIN, {
      nome,
      senha
    });

    return {
      sucesso: resposta.data.sucesso,
      dados: resposta.data.dados,
      mensagem: resposta.data.mensagem
    };
  } catch (erro) {
    return {
      sucesso: false,
      dados: null,
      mensagem: erro.response?.data?.mensagem || 'Erro ao realizar login'
    };
  }
};

const logout = () => {
  CacheUtils.limparTudo();
};

const getToken = () => {
  return CacheUtils.buscar(CHAVES_CACHE.TOKEN);
};

const isAuthenticated = () => {
  return CacheUtils.existe(CHAVES_CACHE.TOKEN);
};

const loginService = {
  login,
  logout,
  getToken,
  isAuthenticated
};

export default loginService;

