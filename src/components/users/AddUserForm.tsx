import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import * as Yup from 'yup';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import { useCreateUser } from '../../features/users/useCreateUser';
import type { User } from '../../features/users/usersTypes';
import type { UserRole } from '../../types/types';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';

const AddUserForm = ({
  onClose,
  role,
}: {
  onClose: () => void;
  role: UserRole;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createUser = useCreateUser(hoaId, role);
  const onSubmit = (user: User, setSubmitting: any, setErrors: any) =>
    createUser.mutate(
      { user, role, hoa: hoaId },
      {
        onSuccess: () => {
          onClose();
          addNotification('Użytkownik został dodany.', 'success');
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      },
    );

  const formikProps: FormikWrapperProps<Partial<User>> = {
    header: 'Dodawanie nowego użytkownika',
    submitLabel: 'Dodaj',
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
    },
    onSubmit: (values, { setSubmitting, setErrors }) =>
      onSubmit(values as User, setSubmitting, setErrors),
    onReset: onClose,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Niepoprawny adres email')
        .required('Email jest wymagany'),
      first_name: Yup.string().required('Imię jest wymagane'),
      last_name: Yup.string().required('Nazwisko jest wymagane'),
    }),
  };

  return (
    <FormikWrapper {...formikProps}>
      <TextInputLiveFeedback label="Imię" type="text" name="first_name" />
      <TextInputLiveFeedback label="Nazwisko" type="text" name="last_name" />
      <TextInputLiveFeedback label="Email" type="email" name="email" />
    </FormikWrapper>
  );
};

export default AddUserForm;
