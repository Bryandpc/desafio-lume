const CHAVES_CACHE = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USUARIO: 'usuario'
};

const CacheUtils = {
  salvar: (chave, valor) => {
    try {
      const valorSerializado = JSON.stringify(valor);
      localStorage.setItem(chave, valorSerializado);
      return true;
    } catch (erro) {
      console.error('Erro ao salvar no cache:', erro);
      return false;
    }
  },

  buscar: (chave) => {
    try {
      const item = localStorage.getItem(chave);
      return item ? JSON.parse(item) : null;
    } catch (erro) {
      console.error('Erro ao buscar do cache:', erro);
      return null;
    }
  },

  remover: (chave) => {
    try {
      localStorage.removeItem(chave);
      return true;
    } catch (erro) {
      console.error('Erro ao remover do cache:', erro);
      return false;
    }
  },

  limparTudo: () => {
    try {
      localStorage.clear();
      return true;
    } catch (erro) {
      console.error('Erro ao limpar cache:', erro);
      return false;
    }
  },

  existe: (chave) => {
    return localStorage.getItem(chave) !== null;
  }
};

export { CacheUtils, CHAVES_CACHE };
