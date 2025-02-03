import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { MeterType } from '../../../../features/meters/metersApiTypes';
import { calculationMethodOptions } from '../../../../features/meters/meterTypes/meterTypesUtlis';
import { useCreateMeterType } from '../../../../features/meters/meterTypes/useCreateMeterType';
import { useNotifications } from '../../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../../common/forms/form/FormikWrapper';
import TextInputLiveFeedback from '../../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import SearchDropdown from '../../../ui/search/SearchDropdown';
import { validationSchema } from './utils';

const AddMeterTypeForm = ({
  onClose,
  existingLabels,
}: {
  onClose: () => void;
  existingLabels: string[];
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createMeterType = useCreateMeterType(hoaId);

  const formikProps: FormikWrapperProps<Partial<MeterType>> = {
    header: 'Dodawanie nowego rodzaju licznika',
    submitLabel: 'Dodaj',
    initialValues: {
      label: '',
      name: '',
      unit: '',
      advance_calculating_method: '',
      average_use: 0,
      hoa: hoaId,
    },
    onSubmit: (values, { setSubmitting, setErrors }) =>
      createMeterType.mutate(
        { ...(values as MeterType) },
        {
          onSuccess: () => {
            onClose();
            addNotification('Nowy rodzaj licznika został dodany.', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      ),
    onCancel: onClose,
    validationSchema: validationSchema(existingLabels),
  };

  return (
    <FormikWrapper {...formikProps}>
      <TextInputLiveFeedback label="Oznaczenie" type="text" name="label" />
      <TextInputLiveFeedback label="Nazwa" type="text" name="name" />
      <TextInputLiveFeedback label="Jednostka" type="text" name="unit" />
      <SearchDropdown
        name="advance_calculating_method"
        isLoading={false}
        label="Sposób naliczania opłaty:"
        options={calculationMethodOptions}
      />
      <TextInputLiveFeedback
        label="Norma zużycia"
        type="number"
        name="average_use"
      />
    </FormikWrapper>
  );
};

export default AddMeterTypeForm;
