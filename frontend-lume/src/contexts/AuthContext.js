import React, { createContext, useContext, useState, useEffect } from 'react';
import loginService from '../services/loginService';
import { CacheUtils, CHAVES_CACHE } from '../utils/cacheUtils';
import { APP_ROUTES } from '../lib/routes';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = CacheUtils.buscar(CHAVES_CACHE.USUARIO);
    if (usuarioSalvo) {
      setUsuario(usuarioSalvo);
    }
    setCarregando(false);
  }, []);

  const login = async (nome, senha) => {
    const resultado = await loginService.login(nome, senha);
    
    if (resultado.sucesso) {
      const { token, refreshToken } = resultado.dados;
      const dadosUsuario = { token, refreshToken, nome };
      
      CacheUtils.salvar(CHAVES_CACHE.TOKEN, token);
      CacheUtils.salvar(CHAVES_CACHE.REFRESH_TOKEN, refreshToken);
      CacheUtils.salvar(CHAVES_CACHE.USUARIO, dadosUsuario);
      
      setUsuario(dadosUsuario);
      return { sucesso: true };
    }
    
    return { 
      sucesso: false, 
      mensagem: resultado.mensagem 
    };
  };

  const logout = () => {
    CacheUtils.limparTudo();
    setUsuario(null);
    window.location.href = APP_ROUTES.publico.login;
  };

  const value = {
    usuario,
    carregando,
    login,
    logout,
    estaAutenticado: !!usuario
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
