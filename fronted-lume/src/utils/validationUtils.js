import { StringUtils } from './stringUtils';
import { MaskUtils } from './maskUtils';

export const ValidationRules = {
  email: {
    required: 'Email é obrigatório',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email inválido'
    }
  },

  senha: {
    required: 'Senha é obrigatória',
  },

  nome: {
    required: 'Nome é obrigatório',
    maxLength: {
      value: 100,
      message: 'Nome deve ter no máximo 100 caracteres'
    }
  },

  cpf: {
    required: 'CPF é obrigatório',
    validate: (value) => {
      const cpfLimpo = MaskUtils.removerMascara(value);
      return StringUtils.validarCPF(cpfLimpo) || 'CPF inválido';
    }
  },

  logradouro: {
    required: 'Logradouro é obrigatório',
    maxLength: {
      value: 200,
      message: 'Logradouro deve ter no máximo 200 caracteres'
    }
  },

  bairro: {
    required: 'Bairro é obrigatório',
    maxLength: {
      value: 20,
      message: 'Bairro deve ter no máximo 20 caracteres'
    }
  },

  cidade: {
    required: 'Cidade é obrigatória',
    maxLength: {
      value: 100,
      message: 'Cidade deve ter no máximo 100 caracteres'
    }
  },

  estado: {
    required: 'Estado é obrigatório',
    maxLength: {
      value: 2,
      message: 'Estado deve ter 2 caracteres'
    },
    minLength: {
      value: 2,
      message: 'Estado deve ter 2 caracteres'
    },
    pattern: {
      value: /^[A-Z]{2}$/,
      message: 'Estado deve ter 2 letras maiúsculas'
    }
  },

  cep: {
    required: 'CEP é obrigatório',
    validate: (value) => {
      const cepLimpo = MaskUtils.removerMascara(value);
      return StringUtils.validarCEP(cepLimpo) || 'CEP inválido';
    }
  }
};

export const LoginValidationUtils = {
  validarCredenciais: (formData) => {
    const errors = [];

    if (!formData.email || formData.email.trim() === '') {
      errors.push('Email é obrigatório');
    }

    if (!formData.senha || formData.senha.trim() === '') {
      errors.push('Senha é obrigatória');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
