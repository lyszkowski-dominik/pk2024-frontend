// import { useState, useEffect, useRef } from 'react';
// import { useField } from 'formik';
// import styles from './SearchDropdown.module.scss';
// import formStyles from '../../common/forms/form/Form.module.scss';
// import Spinner from '../spinner/Spinner';

// export interface SearchDropdownOption {
//   value: number | string;
//   label: string;
// }

// interface SearchDropdownProps {
//   name: string;
//   // useGetOptions: UseQueryResult<any>;
//   // endpoint: string;
//   // queryParams: { [key: string]: any };
//   label: string;
//   isLoading: boolean;
//   options: SearchDropdownOption[];
//   disabled?: boolean;
//   cleanOnDisabling?: boolean;
//   multiselect?: boolean;
//   value?: any[];
// }

// const SearchDropdown: React.FC<SearchDropdownProps> = ({
//   name,
//   // useGetOptions,
//   // endpoint,
//   // queryParams,
//   isLoading,
//   label,
//   options,
//   disabled,
//   cleanOnDisabling,
//   multiselect = false,
//   value = [],
// }) => {
//   const [field, meta, helpers] = useField(name);
//   const { setValue } = helpers;

//   // const [options, setOptions] = useState<SearchDropdownOption[]>([]);
//   const [filteredOptions, setFilteredOptions] =
//     useState<SearchDropdownOption[]>(options);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isFetching, setIsFetching] = useState(false);
//   const [selectedValues, setSelectedValues] =
//     useState<SearchDropdownOption[]>(value);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   // const { data, isLoading, error } = useGetOptions;
//   // const fetchedOptions = getOptions(data.results);
//   // setOptions(fetchedOptions);
//   // setFilteredOptions(fetchedOptions);

//   // const fetchOptions = async () => {
//   //   try {
//   //     setIsFetching(true);
//   //     const response = await axiosInstance.get(endpoint, {
//   //       params: queryParams,
//   //     });
//   //     const fetchedOptions = getOptions(response.data);
//   //     setOptions(fetchedOptions);
//   //     setFilteredOptions(fetchedOptions);
//   //     setIsFetching(false);
//   //   } catch (error) {
//   //     setIsFetching(false);
//   //   }
//   // };
//   useEffect(() => {
//     if (disabled && cleanOnDisabling) {
//       setSearchTerm('');
//       setSelectedValues([]);
//       setIsDropdownOpen(false);
//     }
//   }, [cleanOnDisabling, disabled]);

//   useEffect(() => {
//     if (searchTerm === '') {
//       setFilteredOptions(options);
//     } else {
//       setFilteredOptions(
//         options.filter((option) =>
//           option.label.toLowerCase().includes(searchTerm.toLowerCase()),
//         ),
//       );
//     }
//   }, [searchTerm, options]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   const handleSelectionToggle = (option: SearchDropdownOption) => {
//     if (multiselect) {
//       const isSelected = selectedValues.find(
//         (selected) => selected.value === option.value,
//       );
//       let updatedSelections;
//       if (isSelected) {
//         updatedSelections = selectedValues.filter(
//           (selected) => selected.value !== option.value,
//         );
//       } else {
//         updatedSelections = [...selectedValues, option];
//       }
//       setSelectedValues(updatedSelections);
//       setValue(updatedSelections?.map((opt) => opt.value));
//     } else {
//       setSelectedValues([option]);
//       setValue(option.value);
//       setSearchTerm(option.label);
//       setIsDropdownOpen(false);
//     }
//   };

//   const isSelected = (option: SearchDropdownOption) => {
//     return selectedValues.some((selected) => selected.value === option.value);
//   };

//   const displaySelectedLabels = () => {
//     return selectedValues?.map((opt) => opt.label).join(', ');
//   };

//   return (
//     <div className={formStyles.form_control}>
//       <label>{label}</label>
//       <input
//         type="text"
//         value={
//           isDropdownOpen || !multiselect ? searchTerm : displaySelectedLabels()
//         }
//         onChange={(e) => setSearchTerm(e.target.value)}
//         onClick={() => {
//           if (!isDropdownOpen && !disabled) {
//             // fetchOptions();
//             setIsDropdownOpen(true);
//             setSearchTerm('');
//           }
//         }}
//         onBlur={() => {
//           setTimeout(() => {
//             setIsDropdownOpen(false);
//           }, 100);
//         }}
//         placeholder="Wyszukaj..."
//         className={styles.input}
//         disabled={disabled}
//       />
//       {meta.error && meta.touched && (
//         <div className={styles.error}>{meta.error}</div>
//       )}
//       {isDropdownOpen && (
//         <ul className={styles.dropdown}>
//           {isLoading ? (
//             <li className={styles.dropdownItem}>
//               <Spinner />
//             </li>
//           ) : filteredOptions.length > 0 ? (
//             filteredOptions?.map((option) => (
//               <li
//                 key={option.value}
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => handleSelectionToggle(option)}
//                 className={styles.dropdownItem}
//               >
//                 {multiselect ? (
//                   <>
//                     <input
//                       type="checkbox"
//                       checked={isSelected(option)}
//                       readOnly
//                       className={styles.checkbox}
//                     />
//                     {option.label}
//                   </>
//                 ) : (
//                   <>{option.label}</>
//                 )}
//               </li>
//             ))
//           ) : (
//             <li className={styles.dropdownItem}>Nie znaleziono rezultatów</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchDropdown;
import React, { useEffect } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { useField } from 'formik';
import styles from './SearchDropdown.module.scss';
import formStyles from '../../common/forms/form/Form.module.scss';
import Spinner from '../spinner/Spinner';

export interface SearchDropdownOption {
  value: number | string;
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
  };

  const getSelectValue = () => {
    return !options
      ? null
      : multiselect
        ? options.filter((option) => field.value.includes(option.value))
        : (options.find((option) => option.value === field.value) ?? null);
  };

  return (
    <div className={formStyles.form_control}>
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
