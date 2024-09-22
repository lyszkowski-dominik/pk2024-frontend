import { useState, useEffect, useRef } from 'react';
import { useField } from 'formik';
import styles from './SearchDropdown.module.scss';
import Spinner from '../spinner/Spinner';
import axiosInstance from '../../../services/axiosInstance';

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
  multiselect?: boolean;
  value?: any[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  name,
  endpoint,
  queryParams,
  label,
  getOptions,
  disabled,
  multiselect = false,
  value = [],
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
  const [selectedValues, setSelectedValues] =
    useState<SearchDropdownOption[]>(value);
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

  const handleSelectionToggle = (option: SearchDropdownOption) => {
    if (multiselect) {
      const isSelected = selectedValues.find(
        (selected) => selected.value === option.value,
      );
      let updatedSelections;
      if (isSelected) {
        updatedSelections = selectedValues.filter(
          (selected) => selected.value !== option.value,
        );
      } else {
        updatedSelections = [...selectedValues, option];
      }
      setSelectedValues(updatedSelections);
      setValue(updatedSelections?.map((opt) => opt.value));
    } else {
      setSelectedValues([option]);
      setValue(option.value);
      setSearchTerm(option.label);
      setIsDropdownOpen(false);
    }
  };

  const isSelected = (option: SearchDropdownOption) => {
    return selectedValues.some((selected) => selected.value === option.value);
  };

  const displaySelectedLabels = () => {
    return selectedValues?.map((opt) => opt.label).join(', ');
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input
        type="text"
        value={
          isDropdownOpen || !multiselect ? searchTerm : displaySelectedLabels()
        }
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => {
          if (!isDropdownOpen && !disabled) {
            fetchOptions();
            setIsDropdownOpen(true);
            setSearchTerm('');
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
            filteredOptions?.map((option) => (
              <li
                key={option.value}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelectionToggle(option)}
                className={styles.dropdownItem}
              >
                {multiselect ? (
                  <>
                    <input
                      type="checkbox"
                      checked={isSelected(option)}
                      readOnly
                      className={styles.checkbox}
                    />
                    {option.label}
                  </>
                ) : (
                  <>{option.label}</>
                )}
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
