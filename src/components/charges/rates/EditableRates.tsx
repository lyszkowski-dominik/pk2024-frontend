import { FieldArray } from 'formik';
import Select from 'react-select';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { Rate } from '../../../features/rates/ratesTypes';
import { useNotifications } from '../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../common/forms/form/FormikWrapper';
import { validationSchema } from './utils';
import styles from './EditableRates.module.scss';
import tableStyles from '../../../styles/Table.module.scss';
import inputStyles from '../../common/forms/textInputLiveFeedback/TextInputLiveFeedback.module.scss';
import {
  ChargingMethod,
  chargingMethodOptions,
} from '../../../features/meters/metersApiTypes';
import { useGetMeterTypes } from '../../../features/meters/meterTypes/useGetMeterTypes';
import InputField from '../../common/forms/inputField/InputField';
import IconButton from '../../ui/iconButton/IconButton';
import { useUpdateRate } from '../../../features/rates/useUpdateRate';
import { useGetRatesById } from '../../../features/rates/useGetRatesById';
import { useAddRate } from '../../../features/rates/useAddRate';
import Spinner from '../../ui/spinner/Spinner';

const EditableRates = ({
  onClose,
  id,
  addNew = true,
}: {
  onClose: () => void;
  id?: number;
  addNew?: boolean;
}) => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { addNotification } = useNotifications();

  const { data: initialData, isLoading } = useGetRatesById(id || -1);
  const addRates = useAddRate(hoaId);
  const updateRates = useUpdateRate(hoaId, id || -1);

  const mutation = addNew ? addRates : updateRates;

  const initialValues = {
    start: '',
    rates: [
      { name: '', charging_method: '', meter_types: [], rate_per_unit: '' },
    ],
  };

  const { data: meterTypes, isLoading: loadingTypes } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });
  const typeOptions =
    meterTypes?.results.map((type) => ({
      key: type.id,
      value: type.id,
      label: type.label,
    })) || [];

  const formikProps: FormikWrapperProps<any> = {
    header: 'Aktualizuj stawki',
    submitLabel: 'Zapisz',
    initialValues: {
      start: addNew ? initialValues.start : initialData?.start || '',
      rates: initialData?.rates || initialValues.rates,
      hoa: hoaId,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const formattedValues = {
        ...values,
        start: `${values.start}-01`,
      };
      mutation.mutate(formattedValues, {
        onSuccess: () => {
          onClose();
          addNotification('Dodano nowe stawki', 'success');
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      });
    },
    onCancel: onClose,
    classname: styles.form,
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <FormikWrapper {...formikProps}>
        {({ values, setFieldValue, touched, errors }: any) => {
          return (
            <>
              <div
                className={`${styles.date} ${
                  errors.start && touched.start && inputStyles.invalid
                }`}
              >
                <InputField
                  type="month"
                  label="Data początkowa:"
                  name="start"
                  value={values.start}
                  onChange={(e) => setFieldValue('start', e.target.value)}
                />
              </div>
              <FieldArray name="rates">
                {({ push, remove }) => (
                  <>
                    <div className={tableStyles.tableContainer}>
                      <table className={tableStyles.table}>
                        <thead>
                          <tr>
                            <th>Nazwa</th>
                            <th>Sposób naliczania</th>
                            <th>Źródło danych</th>
                            <th>Stawka</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.rates.map((rate: Rate, index: number) => (
                            <tr key={index}>
                              <td
                                className={
                                  errors.rates?.[index]?.name &&
                                  touched.rates?.[index]?.name &&
                                  inputStyles.invalid
                                }
                              >
                                <InputField
                                  type="text"
                                  name={`rates.${index}.name`}
                                  value={rate.name}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `rates.${index}.name`,
                                      e.target.value,
                                    )
                                  }
                                />
                                {/* {touched?.rates?.[index]?.name &&
                                  errors.rates?.[index]?.name && (
                                    <div className={inputStyles.feedback}>
                                      {errors.rates[index].name}
                                    </div>
                                  )} */}
                              </td>
                              <td
                                className={
                                  errors.rates?.[index]?.charging_method &&
                                  touched.rates?.[index]?.charging_method &&
                                  inputStyles.invalid
                                }
                              >
                                <Select
                                  name={`rates.${index}.method`}
                                  options={chargingMethodOptions}
                                  value={chargingMethodOptions.find(
                                    (option) =>
                                      option.value === rate.charging_method,
                                  )}
                                  onChange={(option) => {
                                    setFieldValue(
                                      `rates.${index}.charging_method`,
                                      option?.value || '',
                                    );
                                    setFieldValue(
                                      `rates.${index}.meter_types`,
                                      [],
                                    );
                                  }}
                                  menuPortalTarget={document.body}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      borderColor:
                                        errors.rates?.[index]
                                          ?.charging_method &&
                                        touched.rates?.[index]?.charging_method
                                          ? 'red'
                                          : base.borderColor,
                                      '&:hover': {
                                        borderColor:
                                          errors.rates?.[index]
                                            ?.charging_method &&
                                          touched.rates?.[index]
                                            ?.charging_method
                                            ? 'red'
                                            : base.borderColor,
                                      },
                                    }),
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                  }}
                                />
                              </td>
                              <td
                                className={
                                  errors.rates?.[index]?.meter_types &&
                                  touched.rates?.[index]?.meter_types &&
                                  inputStyles.invalid
                                }
                              >
                                <Select
                                  name={`rates.${index}.meter_types`}
                                  options={typeOptions}
                                  isMulti
                                  isDisabled={
                                    rate.charging_method !==
                                    ChargingMethod.CONSUMPTION
                                  }
                                  value={typeOptions.filter((sourceOption) =>
                                    rate.meter_types.includes(
                                      sourceOption.value,
                                    ),
                                  )}
                                  onChange={(selectedOptions) =>
                                    setFieldValue(
                                      `rates.${index}.meter_types`,
                                      selectedOptions.map(
                                        (option) => option.value,
                                      ),
                                    )
                                  }
                                  menuPortalTarget={document.body}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      borderColor:
                                        errors.rates?.[index]?.meter_types &&
                                        touched.rates?.[index]?.meter_types
                                          ? 'red'
                                          : base.borderColor,
                                      '&:hover': {
                                        borderColor:
                                          errors.rates?.[index]?.meter_types &&
                                          touched.rates?.[index]?.meter_types
                                            ? 'red'
                                            : base.borderColor,
                                      },
                                    }),
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                  }}
                                />
                              </td>
                              <td
                                className={
                                  errors.rates?.[index]?.rate_per_unit &&
                                  touched.rates?.[index]?.rate_per_unit &&
                                  inputStyles.invalid
                                }
                              >
                                <InputField
                                  type="number"
                                  name={`rates.${index}.rate_per_unit`}
                                  value={rate.rate_per_unit}
                                  onChange={(e) =>
                                    setFieldValue(
                                      `rates.${index}.rate_per_unit`,
                                      e.target.value,
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <IconButton
                                  iconName="delete"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    remove(index);
                                  }}
                                  altText="Usuń"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className={styles.button_add}>
                      <IconButton
                        iconName="add"
                        onClick={() => {
                          push({
                            name: '',
                            charging_method: '',
                            meter_types: [],
                            rate_per_unit: '',
                          });
                        }}
                        altText="Dodaj"
                      />
                    </div>
                  </>
                )}
              </FieldArray>
            </>
          );
        }}
      </FormikWrapper>
    </>
  );
};

export default EditableRates;
