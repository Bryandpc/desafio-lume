export const SITUACAO_CLIENTE = {
  ATIVO: 'ATIVO',
  INATIVO: 'INATIVO'
};

export const API_ENDPOINTS = {
  AUTENTICACAO: {
    LOGIN: '/autenticacao_/login',
    REFRESH: '/autenticacao_/refresh'
  },
  CLIENTE: {
    BASE: '/cliente_',
    POR_ID: (id) => `/cliente_/${id}`
  }
};

export const EnumUtils = {
  SITUACAO_CLIENTE,
  API_ENDPOINTS
};
