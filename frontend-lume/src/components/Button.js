import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ 
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  ...buttonProps
}) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
