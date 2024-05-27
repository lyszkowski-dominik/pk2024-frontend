import { useState, useEffect, useRef } from 'react';
import { useField } from 'formik';
import styles from './SearchDropdown.module.scss';
import Spinner from '../spinner/Spinner';
import axiosInstance from '../../../utils/axiosInstance';

export interface SearchDropdownOption {
  value: number | string;
  label: string;
}

interface SearchDropdownProps {
  name: string;
  endpoint: string;
  queryParams?: { [key: string]: any };
  label: string;
  getOptions: (data: any) => SearchDropdownOption[];
  disabled?: boolean;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  name,
  endpoint,
  queryParams,
  label,
  getOptions,
  disabled,
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const [options, setOptions] = useState<SearchDropdownOption[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<
    SearchDropdownOption[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchOptions = async () => {
    try {
      setIsFetching(true);
      const response = await axiosInstance.get(endpoint, {
        params: queryParams,
      });
      const fetchedOptions = getOptions(response.data);
      setOptions(fetchedOptions);
      setFilteredOptions(fetchedOptions);
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => {
          if (!isDropdownOpen && !disabled) {
            fetchOptions();
            setIsDropdownOpen(true);
          }
        }}
        onBlur={() => {
          setTimeout(() => setIsDropdownOpen(false), 100);
        }}
        placeholder="Wyszukaj..."
        className={styles.input}
        disabled={disabled}
      />
      {meta.error && meta.touched && (
        <div className={styles.error}>{meta.error}</div>
      )}
      {isDropdownOpen && (
        <ul className={styles.dropdown}>
          {isFetching ? (
            <li className={styles.dropdownItem}>
              <Spinner />
            </li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onMouseDown={() => {
                  setValue(option.value);
                  setSearchTerm(option.label);
                  setIsDropdownOpen(false);
                }}
                className={styles.dropdownItem}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className={styles.dropdownItem}>Nie znaleziono rezultatów</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
