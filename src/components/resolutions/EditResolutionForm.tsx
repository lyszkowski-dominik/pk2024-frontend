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
import dayjs from 'dayjs';

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
    initialValues: {
      ...initialData,
    },
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
    onCancel: onClose,
    validationSchema: validationSchema,
  };

  return (
    <FormikWrapper {...formikProps}>
      {({ values }) => {
        const now = dayjs();
        const min = dayjs(values.start_date) > now ? values.start_date : now;
        const max = values.end_date ? values.end_date : undefined;

        return (
          <>
            <TextInputLiveFeedback label="Tytuł" type="text" name="title" />
            <TextAreaLiveFeedback label="Opis" name="description" />
            <TextInputLiveFeedback
              label="Data rozpoczęcia"
              type="date"
              name="start_date"
              min={now}
              max={max}
            />
            <TextInputLiveFeedback
              label="Data zakończenia"
              type="date"
              name="end_date"
              min={min}
            />
          </>
        );
      }}
    </FormikWrapper>
  );
};

export default EditResolutionForm;
