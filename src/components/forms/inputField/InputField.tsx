import type React from 'react';
import styles from './InputField.module.scss';

/**
 * The type `InputFieldProps` defines props for an input field component in TypeScript React.
 * @param {string} label - A descriptive label for the input field.
 * @param {string | undefined} type - The `InputFieldProps` type defines the properties that can be
 * passed to an input field component. The properties are as follows:
 * @param {string} name - The `name` property in the `InputFieldProps` type represents the name of
 * the input field. It is a string type.
 * @param {any} value - The `value` property in the `InputFieldProps` type represents the current
 * value of the input field. It can be of any type (`any`) as specified in the type definition.
 * @param onChange - The `onChange` property in the `InputFieldProps` type is a function that
 * handles the change event for an input element. It is of type
 * `React.ChangeEventHandler<HTMLInputElement>`, which is a generic type defined in React to handle
 * change events on input elements. This function will be called whenever the
 * @param {string | undefined} placeholder - The `placeholder` property in the `InputFieldProps`
 * type represents the text that is displayed in the input field as a hint to the user of what type of
 * input is expected. It is optional and can be used to provide additional guidance to the user.
 * @param {boolean} error - The `error` property in the `InputFieldProps` type is a boolean flag
 * that indicates whether there is an error associated with the input field. If `error` is set to
 * `true`, it typically means that there is an error condition that needs to be visually highlighted in
 * the input field,
 * @param {boolean} disabled - The `disabled` property in the `InputFieldProps` type indicates
 * whether the input field should be disabled or not. If `disabled` is set to `true`, the input field
 * will be disabled and users will not be able to interact with it. If `disabled` is not provided or
 * set
 */
export type InputFieldProps = {
  label: string;
  type?: string | undefined;
  name: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string | undefined;
  error?: boolean;
  disabled?: boolean;
};

/**
 * 
 * @param {InputFieldProps} params
 * @returns {JSX.Element} The `InputField` component returns a form control with a label and an input field.
 */
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
