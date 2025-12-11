import Sidebar from './Sidebar';
import styles from '../styles/MenuWrapper.module.css';

const MenuWrapper = ({ children }) => {
  return (
    <div className={styles.wrapperContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  );
};

export default MenuWrapper;
