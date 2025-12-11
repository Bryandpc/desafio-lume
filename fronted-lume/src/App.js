import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './lib/routes';
import Login from './pages/Login/Login';
import Clientes from './pages/Clientes/Clientes';
import CadastroCliente from './pages/Clientes/CadastroCliente';
import EdicaoCliente from './pages/Clientes/EdicaoCliente';
import NotFound from './pages/NotFound/NotFound';
import styles from './styles/App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route 
            path={APP_ROUTES.publico.login} 
            element={<Login />} 
          />

          <Route 
            path={APP_ROUTES.privado.clientes} 
            element={<Clientes />} 
          />

          <Route 
            path={APP_ROUTES.privado.clientesNovo} 
            element={<CadastroCliente />} 
          />

          <Route 
            path={APP_ROUTES.privado.clientesEditar} 
            element={<EdicaoCliente />} 
          />
          
          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
