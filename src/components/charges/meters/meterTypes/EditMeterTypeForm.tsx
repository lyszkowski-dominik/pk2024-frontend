import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { MeterType } from '../../../../features/meters/metersApiTypes';
import { calculationMethodOptions } from '../../../../features/meters/meterTypes/meterTypesUtlis';
import { useEditMeterType } from '../../../../features/meters/meterTypes/useEditMeterType';
import { useGetMeterType } from '../../../../features/meters/meterTypes/useGetMeterType';
import { useNotifications } from '../../../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../../common/forms/form/FormikWrapper';
import TextInputLiveFeedback from '../../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import SearchDropdown from '../../../ui/search/SearchDropdown';
import Spinner from '../../../ui/spinner/Spinner';
import { validationSchemaEdit } from './utils';

const EditMeterTypeForm = ({
  onClose,
  id,
}: {
  onClose: () => void;
  id: number;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const editMeterType = useEditMeterType(id, hoaId);
  const { data: initialData, isLoading, isError, error } = useGetMeterType(id);

  const formikProps: FormikWrapperProps<Partial<MeterType>> = {
    header: `Edycja typu licznika ${initialData?.label}`,
    submitLabel: 'Zapisz',
    initialValues: initialData,
    onSubmit: (values, { setSubmitting, setErrors }) =>
      editMeterType.mutate(
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
    validationSchema: validationSchemaEdit,
  };

  if (!initialData) return <div>Brak danych</div>;
  if (isLoading) return <Spinner />;
  if (isError) return <div>Błąd: {error.message}</div>;

  return (
    <FormikWrapper {...formikProps}>
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

export default EditMeterTypeForm;
