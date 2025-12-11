export const MaskUtils = {
  // Máscara de CPF: 000.000.000-00
  cpf: (valor) => {
    if (!valor) return '';
    
    valor = valor.replace(/\D/g, '');
    valor = valor.substring(0, 11);
    
    if (valor.length <= 3) {
      return valor;
    } else if (valor.length <= 6) {
      return valor.replace(/(\d{3})(\d+)/, '$1.$2');
    } else if (valor.length <= 9) {
      return valor.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else {
      return valor.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }
  },

  // Máscara de CEP: 00000-000
  cep: (valor) => {
    if (!valor) return '';
    
    valor = valor.replace(/\D/g, '');
    valor = valor.substring(0, 8);
    
    if (valor.length <= 5) {
      return valor;
    } else {
      return valor.replace(/(\d{5})(\d+)/, '$1-$2');
    }
  },

  // Máscara de telefone: (00) 00000-0000 ou (00) 0000-0000
  telefone: (valor) => {
    if (!valor) return '';
    
    valor = valor.replace(/\D/g, '');
    valor = valor.substring(0, 11);
    
    if (valor.length <= 2) {
      return valor;
    } else if (valor.length <= 6) {
      return valor.replace(/(\d{2})(\d+)/, '($1) $2');
    } else if (valor.length <= 10) {
      return valor.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else {
      return valor.replace(/(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    }
  },

  // Remove máscara (mantém apenas números)
  removerMascara: (valor) => {
    if (!valor) return '';
    return valor.replace(/\D/g, '');
  }
};
