import axios from 'axios';

const cepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  timeout: 10000,
});

export const buscarEnderecoPorCep = async (cep) => {
  try {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return {
        sucesso: false,
        dados: null,
        mensagem: 'CEP deve conter 8 dígitos',
      };
    }

    const response = await cepApi.get(`/${cepLimpo}/json/`);

    if (response.data.erro) {
      return {
        sucesso: false,
        dados: null,
        mensagem: 'CEP não encontrado',
      };
    }

    const enderecoFormatado = {
      logradouro: response.data.logradouro || '',
      bairro: response.data.bairro || '',
      cidade: response.data.localidade || '',
      estado: response.data.uf || '',
      cep: cepLimpo,
    };

    return {
      sucesso: true,
      dados: enderecoFormatado,
      mensagem: 'Endereço encontrado com sucesso',
    };
  } catch (erro) {
    console.error('Erro ao buscar CEP:', erro);

    if (erro.code === 'ECONNABORTED') {
      return {
        sucesso: false,
        dados: null,
        mensagem: 'Tempo de busca excedido. Tente novamente.',
      };
    }

    if (!erro.response) {
      return {
        sucesso: false,
        dados: null,
        mensagem: 'Erro de conexão com o serviço de CEP',
      };
    }

    return {
      sucesso: false,
      dados: null,
      mensagem: 'Erro ao buscar CEP. Tente novamente.',
    };
  }
};

const cepService = {
  buscarEnderecoPorCep,
};

export default cepService;
