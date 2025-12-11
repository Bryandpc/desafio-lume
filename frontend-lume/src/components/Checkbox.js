import React from 'react';
import styles from '../styles/Checkbox.module.css';

/**
 * Componente de Checkbox customizado
 * 
 * @param {string} children - Label do checkbox
 * @param {boolean} checked - Estado do checkbox
 * @param {function} onChange - Função chamada ao mudar o estado
 * @param {boolean} disabled - Se o checkbox está desabilitado
 * @param {string} name - Nome do campo
 */
const Checkbox = React.forwardRef(({ 
  children, 
  checked = false, 
  onChange, 
  disabled = false,
  name,
  ...props 
}, ref) => {
  return (
    <label className={`${styles.container} ${disabled ? styles.disabled : ''}`}>
      <input
        ref={ref}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={name}
        {...props}
      />
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{children}</span>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
