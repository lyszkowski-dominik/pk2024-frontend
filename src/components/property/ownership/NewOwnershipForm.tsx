import Spinner from '../../ui/spinner/Spinner';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../../ui/search/SearchDropdown';
import SearchDropdown from '../../ui/search/SearchDropdown';
import { useNotifications } from '../../alerts/NotificationContext';
import type { User } from '../../../features/users/usersTypes';
import { useGetHoaUsers } from '../../../features/users/useGetHoaUsers';
import { UserRole } from '../../../types/types';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../common/forms/form/FormikWrapper';
import { changeValidationSchema } from './ownershipUtils';
import TextInputLiveFeedback from '../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import { useChangeOwnership } from '../../../features/ownerships/useChangeOwnership';
import { useGetMeterTypes } from '../../../features/meters/meterTypes/useGetMeterTypes';
import { useGetMeters } from '../../../features/meters/metersDevices/useGetMeters';
import InputField from '../../common/forms/inputField/InputField';
import { FieldArray } from 'formik';
import tableStyles from '../../../styles/Table.module.scss';
import inputStyles from '../../common/forms/textInputLiveFeedback/TextInputLiveFeedback.module.scss';
import { MeterReading } from '../../../features/meters/metersApiTypes';
import { getUnitDisplay } from '../../charges/utils';

export type FormProps = {
  onClose: () => void;
  propertyId: number;
};

const NewOwnershipForm = ({ onClose, propertyId }: FormProps) => {
  const hoaId = useAppSelector(selectSelectedCommunity) ?? -1;
  const { addNotification } = useNotifications();

  const changeOwnership = useChangeOwnership(propertyId);
  const { isLoading: loadingUsers, data: owners } = useGetHoaUsers({
    page: 1,
    pageSize: 1000,
    hoaId: hoaId,
    role: UserRole.Owner,
  });

  const {
    data: activeMeters,
    isLoading: loadingMeters,
    isError,
    error,
  } = useGetMeters({
    hoaId,
    propertyId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });

  const { data: types } = useGetMeterTypes({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });

  const formikProps: FormikWrapperProps<any> = {
    header: 'Zmiana właściciela',
    submitLabel: 'Zapisz',
    initialValues: {
      owners: [],
      date: '',
      meter_readings: activeMeters?.results.map((meter) => ({
        meter: meter.id,
      })),
      inhabitants: 0,
    },
    validationSchema: changeValidationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      values.meter_readings = values.meter_readings.map((reading: any) => ({
        ...reading,
        reading_date: values.date,
      }));
      changeOwnership.mutate(
        { formData: values, propertyId },
        {
          onSuccess: () => {
            onClose();
            addNotification('Zmieniono właścicieli', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      );
    },
    onCancel: onClose,
  };

  const ownersDropdownOptions: SearchDropdownOption[] = owners
    ? owners.results?.map((user: User) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name} [${user.email}]`,
        key: user.id,
      }))
    : [];

  if (loadingMeters) {
    return <Spinner />;
  }
  if (isError) return <div>Błąd: {error.message}</div>;

  return (
    <FormikWrapper {...formikProps}>
      {({ values, touched, errors, setFieldValue }: any) => {
        return (
          <>
            <SearchDropdown
              name="owners"
              label="Właściciele"
              options={ownersDropdownOptions}
              isLoading={loadingUsers}
              multiselect={true}
            />
            <TextInputLiveFeedback
              label="Data zmiany właściciela"
              type="date"
              name="date"
            />
            <TextInputLiveFeedback
              label="Liczba mieszkańców"
              type="number"
              name="inhabitants"
            />
            <FieldArray name="meter_readings">
              {() => (
                <>
                  <div className={tableStyles.tableContainer}>
                    <table className={tableStyles.table}>
                      <thead>
                        <tr>
                          <th>Typ licznika</th>
                          <th>Numer licznika</th>
                          <th>Wartość</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.meter_readings.map(
                          (reading: Partial<MeterReading>, index: number) => {
                            const meter = activeMeters?.results?.find(
                              (meter) => meter.id === reading.meter,
                            );
                            const type = types?.results?.find(
                              (type) => type.id === meter?.type,
                            );
                            return (
                              <tr key={index}>
                                <td>
                                  <InputField
                                    type="text"
                                    name={`meter_type`}
                                    value={type?.label ?? ''}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <InputField
                                    type="text"
                                    name={`meter_number`}
                                    value={meter?.number ?? ''}
                                    disabled
                                  />
                                </td>
                                <td
                                  className={
                                    errors.meter_readings?.[index]
                                      ?.reading_value &&
                                    touched.meter_readings?.[index]
                                      ?.reading_value &&
                                    inputStyles.invalid
                                  }
                                >
                                  <InputField
                                    type="number"
                                    name={`meter_readings.${index}.reading_value`}
                                    value={reading.reading_value}
                                    onChange={(e) =>
                                      setFieldValue(
                                        `meter_readings.${index}.reading_value`,
                                        e.target.value,
                                      )
                                    }
                                    units={getUnitDisplay(type?.unit ?? '')}
                                  />
                                </td>
                              </tr>
                            );
                          },
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </FieldArray>
          </>
        );
      }}
    </FormikWrapper>
  );
};

export default NewOwnershipForm;
