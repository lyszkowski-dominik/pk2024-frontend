import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useNotifications } from '../../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../../common/forms/form/FormikWrapper';
import SearchDropdown from '../../../ui/search/SearchDropdown';
import TextInputLiveFeedback from '../../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import { validationSchema } from './utils';
import { useCreateMeterReading } from '../../../../features/meters/meterReadings/useCreateMeterReading';
import { useGetMeters } from '../../../../features/meters/metersDevices/useGetMeters';

const AddMeterReadingForm = ({
  onClose,
  meterId,
}: {
  onClose: () => void;
  meterId?: number;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const createReading = useCreateMeterReading(hoaId, meterId);
  const { data: meters, isLoading } = useGetMeters({
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

  const formikProps: FormikWrapperProps<any> = {
    header: 'Dodaj odczyt',
    submitLabel: 'Dodaj',
    initialValues: {
      meter: meterId || '',
      reading_date: '',
      reading_value: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) =>
      createReading.mutate(values, {
        onSuccess: () => {
          onClose();
          addNotification('Dodano nowy odczyt', 'success');
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      }),
    onCancel: onClose,
  };

  return (
    <FormikWrapper {...formikProps}>
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
    </FormikWrapper>
  );
};

export default AddMeterReadingForm;
