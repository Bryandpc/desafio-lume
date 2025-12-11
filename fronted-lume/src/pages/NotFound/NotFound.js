import { useNavigate } from 'react-router-dom';
import { MdOutlineSearchOff } from 'react-icons/md';
import { APP_ROUTES } from '../../lib/routes';
import Button from '../../components/Button';
import MenuWrapper from '../../components/MenuWrapper';
import styles from '../../styles/NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MenuWrapper>
      <div className={styles.container}>
        <div className={styles.content}>

          <MdOutlineSearchOff className={styles.icon} />
          <h1 className={styles.title}>404</h1>
          <p className={styles.message}>Página não encontrada</p>
          <p className={styles.description}>
            A página que você está procurando não existe ou foi removida.
          </p>
          <div className={styles.actions}>
            <Button 
              variant="primary" 
              onClick={() => navigate(APP_ROUTES.privado.clientes)}
            >
              Ir para Home
            </Button>
          </div>
          
        </div>
      </div>
    </MenuWrapper>
  );
};

export default NotFound;
