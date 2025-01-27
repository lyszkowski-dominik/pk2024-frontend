import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useNotifications } from '../../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../../common/forms/form/FormikWrapper';
import SearchDropdown from '../../../ui/search/SearchDropdown';
import TextInputLiveFeedback from '../../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import Spinner from '../../../ui/spinner/Spinner';
import { validationSchema } from './utils';
import { useGetMeterReadingById } from '../../../../features/meters/meterReadings/useGetMeterReadingById';
import { useGetMeters } from '../../../../features/meters/metersDevices/useGetMeters';
import { useUpdateMeterReading } from '../../../../features/meters/meterReadings/useUpdateMeterReading';

const EditMeterReadingForm = ({
  id,
  onClose,
  meterId,
}: {
  id: number;
  onClose: () => void;
  meterId?: number;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const {
    data: initialData,
    isLoading,
    isError,
    error,
  } = useGetMeterReadingById(id);

  const { data: meters, isLoading: loadingMeters } = useGetMeters({
    hoaId,
    page: 1,
    pageSize: 1000,
    isActive: true,
  });
  const metersOptions =
    meters?.results.map((meter) => ({
      key: meter.id,
      value: meter.id,
      label: meter.number,
    })) || [];

  const editMeterDevice = useUpdateMeterReading(
    id,
    hoaId,
    meterId ?? initialData?.meter,
  );

  const formikProps: FormikWrapperProps<any> = {
    header: 'Edytuj odczyt',
    submitLabel: 'Zapisz',
    initialValues: initialData,
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      editMeterDevice.mutate(values, {
        onSuccess: () => {
          onClose();
          addNotification('Edytowano odczyt', 'success');
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      });
    },
    onCancel: onClose,
  };

  if (loadingMeters || isLoading) {
    return <Spinner />;
  }
  if (!initialData) return <div>Brak danych</div>;
  if (isError) return <div>Błąd: {error.message}</div>;

  return (
    <FormikWrapper {...formikProps}>
      {(formik) => (
        <>
          <SearchDropdown
            name="meter"
            label="Licznik"
            options={metersOptions}
            isLoading={isLoading}
            disabled={!!meterId}
          />
          <TextInputLiveFeedback
            label="Data odczytu"
            type="date"
            name="reading_date"
          />
          <TextInputLiveFeedback
            label="Wartość"
            type="number"
            name="reading_value"
          />
        </>
      )}
    </FormikWrapper>
  );
};

export default EditMeterReadingForm;
