import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { IoMdExit } from 'react-icons/io';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { APP_ROUTES } from '../lib/routes';
import styles from '../styles/Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario, logout } = useAuth();
  const [showUserModal, setShowUserModal] = useState(false);

  const menus = [
    {
      name: 'Clientes',
      icon: <IoDocumentTextOutline size={20} />,
      path: APP_ROUTES.privado.clientes
    }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className={styles.sidebarSpacer}></div>
      
      <aside className={styles.sidebar}>
        <nav className={styles.menu}>
          <ul className={styles.menuList}>
            {menus.map((menu, index) => (
              <li 
                key={index} 
                className={`${styles.menuItem} ${location.pathname === menu.path ? styles.active : ''}`}
                onClick={() => navigate(menu.path)}
              >
                <div className={styles.menuItemContainer}>
                  <span className={styles.menuIcon}>{menu.icon}</span>
                  <span className={`${styles.menuText} ${location.pathname === menu.path ? styles.active : ''}`}>
                    {menu.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.dividerMenuFooter}>
          <div 
            className={styles.userSection}
            onMouseEnter={() => setShowUserModal(true)}
            onMouseLeave={() => setShowUserModal(false)}
          >
            <MdOutlineAccountCircle 
              size={30}
              className={styles.userIcon}
            />
            {showUserModal && (
              <div className={styles.userProfileModal}>
                <div className={styles.userProfileInfo}>
                  <div className={styles.userName}>{usuario?.nome || 'Usuário'}</div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.logout} title="Sair">
            <IoMdExit size={30} className={styles.logoutIcon} onClick={handleLogout} />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
