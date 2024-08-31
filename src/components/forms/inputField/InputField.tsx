import type React from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = {
  label: string;
  type?: string | undefined;
  name: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string | undefined;
  error?: boolean;
  disabled?: boolean;
};

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
}: InputFieldProps) => {
  
  const labelClassName = error
    ? styles.label + ' ' + styles['error-label']
    : styles.label;

  const inputClassName = error
    ? styles.input + ' ' + styles['error-input']
    : styles.input;

  return (
    <div className={styles['form-control']}>
      <label className={labelClassName}>{label}</label>

      <input
        disabled={disabled}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
};

export default InputField;
