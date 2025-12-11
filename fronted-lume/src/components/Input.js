import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import styles from '../styles/Input.module.css';

const Input = React.forwardRef(({ 
  children,
  placeholder = 'Digite aqui...',
  value,
  onChange,
  type = 'text',
  required = false,
  className = '',
  error = null,
  style = {},
  icon = null,
  disabled = false,
  maxLength,
  name,
  ...inputProps
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`${styles.inputContainer} ${error ? styles.hasError : ''} ${className}`} style={style}>
      {children && (
        <label className={`${styles.label} ${error ? styles.labelError : ''}`}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        <input 
          ref={ref}
          type={inputType}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          name={name}
          {...inputProps}
        />
        
        {type === 'password' && (
          <span 
            className={styles.eyeIcon}
            onClick={!disabled ? togglePasswordVisibility : undefined}
          >
            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </span>
        )}
      </div>
      
      {error && (
        <span className={styles.errorMessage}>{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
