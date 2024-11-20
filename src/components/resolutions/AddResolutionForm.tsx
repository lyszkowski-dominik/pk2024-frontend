import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import TextAreaLiveFeedback from '../common/forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { Resolution } from '../../features/resolutions/resolutionsTypes';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import { useCreateResolution } from '../../features/resolutions/useCreateResolution';
import { useNotifications } from '../alerts/NotificationContext';
import { validationSchema } from './utils';

const AddResolutionForm = ({ onClose }: { onClose: () => void }) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createResolution = useCreateResolution(hoaId);

  const formikProps: FormikWrapperProps<Partial<Resolution>> = {
    header: 'Dodawanie nowej uchwały',
    submitLabel: 'Dodaj',
    initialValues: {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      hoa: hoaId,
    },
    onSubmit: (values, { setSubmitting, setErrors }) =>
      createResolution.mutate(
        { ...(values as Resolution) },
        {
          onSuccess: () => {
            onClose();
            addNotification('Uchwałą została dodana.', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      ),
    onReset: onClose,
    validationSchema: validationSchema,
  };

  return (
    <FormikWrapper {...formikProps}>
      <TextInputLiveFeedback label="Tytuł" type="text" name="title" />
      <TextAreaLiveFeedback label="Opis" name="description" />
      <TextInputLiveFeedback
        label="Data rozpoczęcia"
        type="date"
        name="start_date"
      />
      <TextInputLiveFeedback
        label="Data zakończenia"
        type="date"
        name="end_date"
      />
    </FormikWrapper>
  );
};

export default AddResolutionForm;
