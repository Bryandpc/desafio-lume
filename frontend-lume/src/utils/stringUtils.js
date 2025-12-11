export const StringUtils = {
  // Remove caracteres não numéricos
  apenasNumeros: (valor) => {
    if (!valor) return '';
    return valor.replace(/\D/g, '');
  },

  // Valida CPF
  validarCPF: (cpf) => {
    if (!cpf) return false;
    
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;
    
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  },

  // Valida CEP
  validarCEP: (cep) => {
    if (!cep) return false;
    
    cep = cep.replace(/\D/g, '');
    
    return cep.length === 8;
  },

  // Valida se string não está vazia
  naoVazio: (valor) => {
    return valor && valor.trim().length > 0;
  },

  // Valida tamanho mínimo
  tamanhoMinimo: (valor, minimo) => {
    if (!valor) return false;
    return valor.length >= minimo;
  },

  // Valida tamanho máximo
  tamanhoMaximo: (valor, maximo) => {
    if (!valor) return true;
    return valor.length <= maximo;
  }
};
