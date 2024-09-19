import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import styles2 from './PasswordResetEmailForm.module.scss';
import { ResetPasswordEmail } from '../../utils/ResetPasswordEmail';
import { useNavigate } from 'react-router';
import SubmitButton from '../forms/submitButton/SubmitButton';


/**
 * 
 * @returns {JSX.Element} The `ResetPasswordEmailForm` component returns a form for resetting the password.
 */
const ResetPasswordEmailForm = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ email: string } | null>(
    null,
  );
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const formikReset = useFormik({
    initialValues: {
      email: '',
    },

    onSubmit: async (values) => {
      setIsWaiting(true);
      try {
        await ResetPasswordEmail(values);
        navigate('/password-reset-email-sent', { replace: true });
      } catch (err: any) {
        setIsError(true);
        if (err.response) {
          setErrorMessages(err.response.data);
        } else {
          setErrorMessages({ email: 'Wystąpił błąd' });
        }
      }

      setIsWaiting(false);
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Niepoprawny adres email')
        .required('Adres email jest wymagany'),
    }),
  });

  return (
    <>
      <h1>Zmiana hasła</h1>
      <p className={styles2.info}>Na podany adres zostanie wysłany email z linkiem umożliwiajacym zmianę hasła.</p>
      <FormikProvider value={formikReset}>
        <Form>
          <TextInputLiveFeedback
            label="Podaj email"
            name="email"
            type="email"
            id="email"
            className="label"
          />
          {isError && (
            <div className={styles.error}>
              {errorMessages?.email && <p>{errorMessages.email}</p>}
            </div>
          )}
          {!isWaiting && (
            <div className={`${styles.buttons}`}>
              <SubmitButton text="Resetuj hasło" />
              <Button
                onClick={() => {
                  navigate('/login');
                }}
                color='secondary'
              >
                Anuluj
              </Button>
            </div>
          )}
          {isWaiting && (
            <div className={styles.waiting}>
              <CircularProgress color="primary" sx={{ fontSize: 40 }} />
            </div>
          )}
        </Form>
      </FormikProvider>
    </>
  );
};

export default ResetPasswordEmailForm;
