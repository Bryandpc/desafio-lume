import axios from 'axios';
import { CacheUtils, CHAVES_CACHE } from '../utils/cacheUtils';
import { API_ENDPOINTS } from '../utils/enumUtils';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; 
    const now = Date.now();
    const isExpired = now >= exp;
    
    // checa expiração do token
    
    return isExpired;
  } catch (erro) {
    console.error('[HTTP] Erro ao verificar expiração do token:', erro);
    return true;
  }
};

let isRefreshing = false;
let refreshPromise = null;

const refreshToken = async () => {
  
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  
  const refreshTokenAtual = CacheUtils.buscar(CHAVES_CACHE.REFRESH_TOKEN);
  
  if (!refreshTokenAtual) {
    isRefreshing = false;
    throw new Error('Refresh token não encontrado');
  }
  
  refreshPromise = http.post(API_ENDPOINTS.AUTENTICACAO.REFRESH, refreshTokenAtual, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
    .then((resposta) => {
      if (resposta.data.sucesso) {
        const { token, refreshToken: novoRefreshToken } = resposta.data.dados;

        CacheUtils.salvar(CHAVES_CACHE.TOKEN, token);
        CacheUtils.salvar(CHAVES_CACHE.REFRESH_TOKEN, novoRefreshToken);

        const usuario = CacheUtils.buscar(CHAVES_CACHE.USUARIO);
        if (usuario) {
          CacheUtils.salvar(CHAVES_CACHE.USUARIO, { ...usuario, token, refreshToken: novoRefreshToken });
        }

        return token;
      }
      throw new Error('Falha ao renovar token');
    })
    .catch((erro) => {
      console.error('[HTTP] Erro ao renovar token:', erro);
      CacheUtils.limparTudo();
      window.location.href = '/';
      throw erro;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};

http.interceptors.request.use(
  async (config) => {
    if (config.url?.includes(API_ENDPOINTS.AUTENTICACAO.REFRESH)) {
      return config;
    }

    let token = CacheUtils.buscar(CHAVES_CACHE.TOKEN);
    
    if (token && isTokenExpired(token)) {
      try {
        token = await refreshToken();
      } catch (erro) {
        console.error('[HTTP] Falha ao renovar token:', erro);
        return Promise.reject(erro);
      }
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (erro) => {
    console.error('[HTTP] Erro no interceptor de requisição:', erro);
    return Promise.reject(erro);
  }
);

http.interceptors.response.use(
  (resposta) => {
    return resposta;
  },
  async (erro) => {
    console.error('[HTTP] Erro na resposta:', {
      url: erro.config?.url,
      status: erro.response?.status,
      mensagem: erro.response?.data?.mensagem || erro.message
    });
    
    if (erro.response?.status === 401 && !erro.config?.url?.includes(API_ENDPOINTS.AUTENTICACAO.LOGIN)) {
      CacheUtils.limparTudo();
      window.location.href = '/';
    }

    return Promise.reject(erro);
  }
);

export default http;
