import { Form, FormikProvider, useFormik } from 'formik';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import { Button } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { CreateNewUser } from '../../features/users/CreateNewUser';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../notifications/NotificationContext';
import Spinner from '../ui/spinner/Spinner';

/**
 *
 * @param {function} isModalOn The `isModalOn` function is a callback function that closes the form.
 * @param {function} refreshList The `refreshList` function is a callback function that refreshes the list of users.
 * @returns {JSX.Element} The `AddUserForm` component returns a form for adding a new user.
 */
const AddUserForm = ({
  isModalOn,
  refreshList,
  role,
}: {
  isModalOn: (value: boolean) => void;
  refreshList: () => void;
  role: string;
}) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    hoaID?: number;
  } | null>(null);
  const { addNotification } = useNotifications();
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;

  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      role: role,
      hoa: hoaID,
    },
    onSubmit: async (values) => {
      console.log(values);
      setIsWaiting(true);
      const res = await CreateNewUser(values);
      if (res.status === 400) {
        setErrorMessages(res.data);
        console.log(res.data);
        setIsError(true);
      } else {
        setIsError(false);
        setIsSuccess(true);
        addNotification('Użytkownik został dodany.', 'success');
        isModalOn(false);
      }
      setIsWaiting(false);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Niepoprawny adres email')
        .required('Email jest wymagany'),
      first_name: Yup.string().required('Imię jest wymagane'),
      last_name: Yup.string().required('Nazwisko jest wymagane'),
    }),
  });
  const [isWaiting, setIsWaiting] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Dodawanie nowego użytkownika</h1>
      {!isSuccess && (
        <FormikProvider value={formik}>
          <Form>
            <TextInputLiveFeedback label="Imię" type="text" name="first_name" />
            <TextInputLiveFeedback
              label="Nazwisko"
              type="text"
              name="last_name"
            />
            <TextInputLiveFeedback label="Email" type="email" name="email" />
            {isError && (
              <div className={styles.error}>
                {errorMessages?.email && <div>{errorMessages.email}</div>}
                {errorMessages?.first_name && (
                  <div>{errorMessages.first_name}</div>
                )}
                {errorMessages?.last_name && (
                  <div>{errorMessages.last_name}</div>
                )}
              </div>
            )}
            {!isWaiting && (
              <div className={styles.buttons}>
                <Button
                  variant="contained"
                  className={styles.change}
                  type="submit"
                >
                  Dodaj
                </Button>
                <Button
                  color="secondary"
                  className={styles.cancel}
                  type="reset"
                  onClick={() => {
                    isModalOn(false);
                  }}
                >
                  Anuluj
                </Button>
              </div>
            )}
            {isWaiting && <Spinner />}
          </Form>
        </FormikProvider>
      )}
    </div>
  );
};

export default AddUserForm;
