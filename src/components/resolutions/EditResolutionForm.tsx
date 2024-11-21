import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import TextAreaLiveFeedback from '../common/forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { useAppSelector } from '../../app/hooks';
import { Resolution } from '../../features/resolutions/resolutionsTypes';
import { useEditResolution } from '../../features/resolutions/useEditResolution';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import { validationSchema } from './utils';

export type EditResolutionFormProps = {
  initialData: Resolution;
  onClose: () => void;
};

const EditResolutionForm = ({
  initialData,
  onClose,
}: EditResolutionFormProps) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const editResolution = useEditResolution(hoaId, initialData.id);

  const formikProps: FormikWrapperProps<Partial<Resolution>> = {
    header: 'Edycja uchwały',
    initialValues: initialData,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      editResolution.mutate(
        { id: initialData.id, editedData: { ...(values as Resolution) } },
        {
          onSuccess: () => {
            onClose();
            addNotification('Edytowano uchwałę.', 'success');
          },
          onError: (error) => {
            setErrors(error as any);
            setSubmitting(false);
          },
        },
      );
    },
    onReset: onClose,
    validationSchema: validationSchema,
  };

  return (
    <FormikWrapper {...formikProps}>
      <TextInputLiveFeedback label="Tytuł" type="text" name="title" />
      <TextAreaLiveFeedback label="Opis" name="description" />
      <TextInputLiveFeedback
        label="Data rozpoczęcia"
        type="datetime"
        name="start_date"
      />
      <TextInputLiveFeedback
        label="Data zakończenia"
        type="datetime"
        name="end_date"
      />
    </FormikWrapper>
  );
};

export default EditResolutionForm;
