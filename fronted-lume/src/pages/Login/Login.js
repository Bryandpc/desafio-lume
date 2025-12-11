import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { toastUtils } from '../../utils/toastUtils';
import { ValidationRules } from '../../utils/validationUtils';
import { useAuth } from '../../contexts/AuthContext';
import { APP_ROUTES } from '../../lib/routes';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (dados) => {
    setCarregando(true);
    try {
      const resultado = await login(dados.nome, dados.senha);
      
      if (resultado.sucesso) {
        toastUtils.sucesso('Login realizado com sucesso!');
        navigate(APP_ROUTES.privado.clientes);
      } else {
        toastUtils.erro(resultado.mensagem);
      }
    } catch (erro) {
      toastUtils.erro('Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <img src="/logo.png" alt="Lume Logo" className={styles.logo} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            type="text"
            placeholder="Seu nome de usuário"
            error={errors.nome?.message}
            disabled={carregando}
            {...register('nome', {
              required: 'Nome é obrigatório'
            })}
          >
            Nome
          </Input>

          <Input
            type="password"
            placeholder="Sua senha"
            error={errors.senha?.message}
            disabled={carregando}
            {...register('senha', ValidationRules.senha)}
          >
            Senha
          </Input>

          <Button 
            type="submit" 
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
