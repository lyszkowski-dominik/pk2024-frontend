import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import * as Yup from 'yup';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import TextAreaLiveFeedback from '../common/forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { useNotifications } from '../alerts/NotificationContext';
import { useCreateNotification } from '../../features/notifications/useCreateNotification';
import { Notification } from '../../features/notifications/notificationTypes';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';

const AddNotificationForm = ({ onClose }: { onClose: () => void }) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createNotification = useCreateNotification(hoaId);

  const formikProps: FormikWrapperProps<Partial<Notification>> = {
    header: 'Dodawanie nowego powiadomienia',
    submitLabel: 'Dodaj',
    initialValues: {
      message: '',
      description: '',
      link: '',
      hoa: hoaId,
    },
    onSubmit: (values, { setSubmitting, setErrors }) =>
      createNotification.mutate(
        { ...(values as Notification) },
        {
          onSuccess: () => {
            onClose();
            addNotification('Powiadomienie zostało dodane.', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      ),
    onCancel: onClose,
    validationSchema: Yup.object({
      message: Yup.string().required('Wiadomość jest wymagana'),
    }),
  };

  return (
    <FormikWrapper {...formikProps}>
      <TextInputLiveFeedback label="Wiadomość" type="text" name="message" />
      <TextAreaLiveFeedback label="Opis" name="description" />
      <TextInputLiveFeedback label="Link" type="text" name="link" />
    </FormikWrapper>
  );
};

export default AddNotificationForm;
