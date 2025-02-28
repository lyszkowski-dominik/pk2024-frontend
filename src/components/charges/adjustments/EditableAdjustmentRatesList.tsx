import { FieldArray } from 'formik';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { Rate, RatesSet } from '../../../features/rates/ratesTypes';
import { useNotifications } from '../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../common/forms/form/FormikWrapper';
import { validationSchema } from './utils';
import styles from './EditableRates.module.scss';
import tableStyles from '../../../styles/Table.module.scss';
import inputStyles from '../../common/forms/textInputLiveFeedback/TextInputLiveFeedback.module.scss';
import InputField from '../../common/forms/inputField/InputField';
import Spinner from '../../ui/spinner/Spinner';
import { useGetAdjustmentRates } from '../../../features/rates/useGetAdjustmentRates';
import { useGenerateAdjustments } from '../../../features/adjustments/useGenerateAdjustments';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useGetMeterTypes } from '../../../features/meters/meterTypes/useGetMeterTypes';
import { chargingMethodDisplayMap } from '../../../features/meters/metersApiTypes';

const EditableAdjustmentRatesList = ({ onClose }: { onClose: () => void }) => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [endDate, setEndDate] = useState<Date>(
    dayjs().startOf('month').toDate(),
  );
  const { addNotification } = useNotifications();

  // Get the list of rate sets
  const { data, isLoading } = useGetAdjustmentRates(
    hoaId,
    dayjs(endDate).startOf('month').subtract(1, 'day').format('YYYY-MM-DD'),
  );
  const generateAdjustments = useGenerateAdjustments(hoaId);

  const { data: meterTypes, isLoading: loadingTypes } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });
  if (isLoading) return <Spinner />;

  // Transform each rate set to ensure rate_per_unit is formatted as string with 2 decimals.
  const initialRateSets = data?.rates.map((rateSet) => ({
    ...rateSet,
    rates: rateSet.rates.map((rate: Rate) => ({
      ...rate,
      rate_per_unit: parseFloat(`${rate.rate_per_unit}`).toFixed(2),
    })),
  }));

  const formikProps: FormikWrapperProps<any> = {
    header: `Korekta za okres ...`,
    submitLabel: 'Zapisz',
    initialValues: {
      date: dayjs(endDate).format('YYYY-MM'),
      rates: initialRateSets,
      hoaId,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      // Format the values as needed (for example, append day to date)
      const formattedValues = {
        ...values,
        date: dayjs(endDate)
          .startOf('month')
          .subtract(1, 'day')
          .format('YYYY-MM-DD'),
      };
      generateAdjustments.mutate(formattedValues, {
        onSuccess: () => {
          onClose();
          addNotification('Wystawiono korekty', 'success');
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

  return (
    <FormikWrapper {...formikProps}>
      {({ values, setFieldValue, touched, errors }: any) => (
        <>
          <div
            className={`${styles.date} ${
              errors.start && touched.start && inputStyles.invalid
            }`}
          >
            <InputField
              type="month"
              label="Data:"
              name="date"
              value={values.date}
              onChange={(e) => {
                setFieldValue('date', e.target.value);
                setEndDate(new Date(e.target.value + '-01'));
              }}
              min={data?.last_group_adjustment.start_month || undefined}
            />
          </div>
          <FieldArray name="rates">
            {() => (
              <>
                {values.rates?.map((rateSet: RatesSet, rsIndex: number) => (
                  <div key={rateSet.id} className={styles.rateSetContainer}>
                    <h3>
                      {rateSet.start} - {rateSet.end}
                    </h3>
                    <FieldArray name={`rateSets.${rsIndex}.rates`}>
                      {() => (
                        <div className={tableStyles.tableContainer}>
                          <table className={tableStyles.table}>
                            <thead>
                              <tr>
                                <th>Nazwa</th>
                                <th>Sposób naliczania</th>
                                <th>Źródło danych</th>
                                <th>Stawka</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rateSet.rates.map(
                                (rate: Rate, index: number) => (
                                  <tr key={rate.id}>
                                    <td
                                      className={
                                        errors?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.name &&
                                        touched?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.name &&
                                        inputStyles.invalid
                                      }
                                    >
                                      <InputField
                                        type="text"
                                        name={`rateSets.${rsIndex}.rates.${index}.name`}
                                        value={rate.name}
                                        disabled
                                      />
                                    </td>
                                    <td
                                      className={
                                        errors?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.charging_method &&
                                        touched?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.charging_method &&
                                        inputStyles.invalid
                                      }
                                    >
                                      <InputField
                                        name={`rateSets.${rsIndex}.rates.${index}.charging_method`}
                                        value={
                                          chargingMethodDisplayMap[
                                            rate.charging_method
                                          ]
                                        }
                                        disabled
                                      />
                                    </td>
                                    <td
                                      className={
                                        errors?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.meter_types &&
                                        touched?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.meter_types &&
                                        inputStyles.invalid
                                      }
                                    >
                                      <InputField
                                        name={`rateSets.${rsIndex}.rates.${index}.meter_types`}
                                        value={rate.meter_types
                                          .map(
                                            (m) =>
                                              meterTypes?.results.find(
                                                (mt) => mt.id === m,
                                              )?.label,
                                          )
                                          .join(', ')}
                                        disabled
                                      />
                                    </td>
                                    <td
                                      className={
                                        errors?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.rate_per_unit &&
                                        touched?.rateSets?.[rsIndex]?.rates?.[
                                          index
                                        ]?.rate_per_unit &&
                                        inputStyles.invalid
                                      }
                                    >
                                      <InputField
                                        type="number"
                                        name={`rateSets.${rsIndex}.rates.${index}.rate_per_unit`}
                                        value={rate.rate_per_unit}
                                        onChange={(e) =>
                                          setFieldValue(
                                            `rateSets.${rsIndex}.rates.${index}.rate_per_unit`,
                                            e.target.value,
                                          )
                                        }
                                        units="zł"
                                        onBlur={(e) => {
                                          setFieldValue(
                                            `rateSets.${rsIndex}.rates.${index}.rate_per_unit`,
                                            parseFloat(e.target.value).toFixed(
                                              2,
                                            ),
                                          );
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                ))}
              </>
            )}
          </FieldArray>
        </>
      )}
    </FormikWrapper>
  );
};

export default EditableAdjustmentRatesList;
