import React, { useEffect } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { useField } from 'formik';
import styles from './SearchDropdown.module.scss';
import formStyles from '../../common/forms/form/Form.module.scss';
import Spinner from '../spinner/Spinner';

export interface SearchDropdownOption {
  value: number | string | object;
  label: string;
}

interface SearchDropdownProps {
  name: string;
  label: string;
  isLoading: boolean;
  options: SearchDropdownOption[];
  disabled?: boolean;
  cleanOnDisabling?: boolean;
  multiselect?: boolean;
  value?: any[];
  placeholder?: string;
  onChange?: (
    option:
      | SingleValue<SearchDropdownOption>
      | MultiValue<SearchDropdownOption>,
  ) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  name,
  label,
  isLoading,
  options,
  disabled = false,
  cleanOnDisabling = false,
  multiselect = false,
  placeholder,
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  useEffect(() => {
    if (disabled && cleanOnDisabling) {
      setValue(multiselect ? [] : null);
    }
  }, [cleanOnDisabling, disabled, multiselect, setValue]);

  const handleChange = (
    selectedOption:
      | SingleValue<SearchDropdownOption>
      | MultiValue<SearchDropdownOption>,
  ) => {
    if (multiselect) {
      const selectedValues = (
        selectedOption as MultiValue<SearchDropdownOption>
      ).map((option) => option.value);
      setValue(selectedValues);
    } else {
      setValue((selectedOption as SearchDropdownOption)?.value || null);
    }
    onChange?.(selectedOption);
  };

  const getSelectValue = () => {
    return !options
      ? null
      : multiselect
        ? options.filter((option) => field.value.includes(option.value))
        : (options.find((option) => option.value === field.value) ?? null);
  };

  return (
    <div className={formStyles.form_control_dropdown}>
      <label>{label}</label>
      <Select
        isMulti={multiselect}
        components={{ LoadingIndicator: Spinner }}
        options={options}
        isDisabled={disabled}
        isLoading={isLoading}
        value={getSelectValue()}
        onChange={handleChange}
        placeholder={placeholder || 'Wyszukaj...'}
        classNamePrefix={styles.input}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
      {meta.error && meta.touched && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  );
};

export default SearchDropdown;
