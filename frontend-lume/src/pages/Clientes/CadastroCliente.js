import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import MenuWrapper from '../../components/MenuWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Loading from '../../components/Loading';
import clienteService from '../../services/clienteService';
import cepService from '../../services/cepService';
import { toastUtils } from '../../utils/toastUtils';
import { ValidationRules } from '../../utils/validationUtils';
import { MaskUtils } from '../../utils/maskUtils';
import { SITUACAO_CLIENTE } from '../../utils/enumUtils';
import { APP_ROUTES } from '../../lib/routes';
import styles from '../../styles/ClienteForm.module.css';

const CadastroCliente = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();
  const [carregando, setCarregando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);

  
  const handleBuscarCep = async (cep) => {
    const cepLimpo = MaskUtils.removerMascara(cep);

    if (cepLimpo.length !== 8) {
      return;
    }

    setBuscandoCep(true);
    try {
      const resultado = await cepService.buscarEnderecoPorCep(cepLimpo);

      if (resultado.sucesso) {
        setValue('logradouro', resultado.dados.logradouro);
        setValue('bairro', resultado.dados.bairro);
        setValue('cidade', resultado.dados.cidade);
        setValue('estado', resultado.dados.estado);
      } else {
        toastUtils.aviso(resultado.mensagem);
      }
    } catch (erro) {
      toastUtils.erro('Erro ao buscar CEP');
    } finally {
      setBuscandoCep(false);
    }
  };

  const onSubmit = async (dados) => {
    const dadosLimpos = {
      nome: dados.nome,
      cpf: MaskUtils.removerMascara(dados.cpf),
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.cidade,
      estado: dados.estado,
      cep: MaskUtils.removerMascara(dados.cep),
      situacao: SITUACAO_CLIENTE.ATIVO
    };

    setCarregando(true);
    try {
      const resultado = await clienteService.criar(dadosLimpos);
      
      if (resultado.sucesso) {
        toastUtils.sucesso('Cliente cadastrado com sucesso!');
        navigate(APP_ROUTES.privado.clientes);
      } else {
        toastUtils.erro(resultado.mensagem);
      }
    } catch (erro) {
      toastUtils.erro('Erro ao cadastrar cliente');
    } finally {
      setCarregando(false);
    }
  };

  const handleCancelar = () => {
    navigate(APP_ROUTES.privado.clientes);
  };

  return (
    <MenuWrapper>
      <Loading carregando={carregando} mensagem="Salvando cliente..." />
      
      <div className={styles.container}>
        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>Novo Cliente</h1>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGrid}>
              <Input
                type="text"
                placeholder="Nome completo"
                error={errors.nome?.message}
                disabled={carregando}
                {...register('nome', ValidationRules.nome)}
              >
                Nome
              </Input>

              <Controller
                name="cpf"
                control={control}
                rules={ValidationRules.cpf}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    placeholder="000.000.000-00"
                    error={errors.cpf?.message}
                    disabled={carregando}
                    value={value || ''}
                    onChange={(e) => onChange(MaskUtils.cpf(e.target.value))}
                  >
                    CPF
                  </Input>
                )}
              />

              <Input
                type="text"
                placeholder="Rua, Avenida, etc"
                error={errors.logradouro?.message}
                disabled={carregando}
                {...register('logradouro', ValidationRules.logradouro)}
              >
                Logradouro
              </Input>

              <Input
                type="text"
                placeholder="Bairro"
                error={errors.bairro?.message}
                disabled={carregando}
                {...register('bairro', ValidationRules.bairro)}
              >
                Bairro
              </Input>

              <Input
                type="text"
                placeholder="Cidade"
                error={errors.cidade?.message}
                disabled={carregando}
                {...register('cidade', ValidationRules.cidade)}
              >
                Cidade
              </Input>

              <Input
                type="text"
                placeholder="UF"
                error={errors.estado?.message}
                disabled={carregando}
                {...register('estado', ValidationRules.estado)}
              >
                Estado
              </Input>

              <Controller
                name="cep"
                control={control}
                rules={ValidationRules.cep}
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    placeholder="00000-000"
                    error={errors.cep?.message}
                    disabled={carregando || buscandoCep}
                    value={value || ''}
                    onChange={(e) => {
                      const cepFormatado = MaskUtils.cep(e.target.value);
                      onChange(cepFormatado);
                      
                      const cepLimpo = MaskUtils.removerMascara(cepFormatado);
                      if (cepLimpo.length === 8) {
                        handleBuscarCep(cepFormatado);
                      }
                    }}
                  >
                    CEP {buscandoCep && '(buscando...)'}
                  </Input>
                )}
              />

              <div className={styles.checkboxWrapper}>
                <Checkbox
                  checked={true}
                  disabled={true}
                >
                  Cliente Ativo
                </Checkbox>
              </div>
            </div>

            <div className={styles.formActions}>
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancelar}
                disabled={carregando}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={carregando}
              >
                {carregando ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MenuWrapper>
  );
};

export default CadastroCliente;
