import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MenuWrapper from '../../components/MenuWrapper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { clienteService } from '../../services/clienteService';
import { toastUtils } from '../../utils/toastUtils';
import { APP_ROUTES } from '../../lib/routes';
import styles from '../../styles/ClienteForm.module.css';

const ClienteNovo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [carregando, setCarregando] = useState(false);

  const onSubmit = async (dados) => {
    setCarregando(true);
    try {
      const resultado = await clienteService.criar(dados);
      
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
                {...register('nome', {
                  required: 'Nome é obrigatório'
                })}
              >
                Nome
              </Input>

              <Input
                type="email"
                placeholder="email@exemplo.com"
                error={errors.email?.message}
                disabled={carregando}
                {...register('email', {
                  required: 'Email é obrigatório',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
              >
                Email
              </Input>

              <Input
                type="text"
                placeholder="(00) 00000-0000"
                error={errors.telefone?.message}
                disabled={carregando}
                {...register('telefone')}
              >
                Telefone
              </Input>
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

export default ClienteNovo;
