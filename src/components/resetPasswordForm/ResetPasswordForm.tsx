import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import TextInputLiveFeedback from '../passwordChangeForm/TextInputLiveFeedback';
import { CircularProgress } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import styles2 from './ResetPasswordForm.module.scss';
import './global_css.css';
import { ResetPassword } from '../../utils/ResetPassword';

type Payload = {
  setIsResetting: React.Dispatch<React.SetStateAction<boolean>>
}


const ResetPasswordForm = ({ setIsResetting }: Payload) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ email: string } | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formikReset = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: async (values) => {
      setIsWaiting(true);
      try {
        await ResetPassword(values);
      } catch (err: any) {
        setIsError(true);
        if (err.response) {
          setErrorMessages(err.response.data);
        } else {
          setErrorMessages({ email: 'Wystąpił błąd' });
        }
      }


      setIsSuccess(true);
      setIsWaiting(false);
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany')
    })
  });

  return (
    <div className={`${styles.container} ${styles2.container_main}`}>
      <h1>Zmiana hasła</h1>
      {isSuccess &&
        <div className={styles.success}>Na podany adres ( jeśli istnieje w bazie ) został wysłany link do zmiany hasła.
          <div className={styles.buttons}>
            <button className={styles.cancel_button} type="button" onClick={() => {
              setIsResetting(false);
              setIsSuccess(false);
            }}>Zamknij
            </button>
          </div>
        </div>}
      {!isSuccess && (
        <FormikProvider value={formikReset}>
          <Form>
            <TextInputLiveFeedback
              label="Podaj email"
              name="email"
              type="email"
              id="email"
              className="input_reset_form"
            />
            {isError && (
              <div className={styles.error}>
                {errorMessages?.email && <p>{errorMessages.email}</p>}
              </div>
            )}
            {!isWaiting && (
              <div className={`${styles.buttons} ${styles2.buttons2}`}>
                <button className={styles.change} type="submit">Resetuj hasło</button>
                <button className={styles.cancel} type="reset" onClick={() => {
                  setIsResetting(false);
                }}>Anuluj
                </button>
              </div>
            )
            }
            {isWaiting && (
              <div className={styles.waiting}><CircularProgress color="primary" sx={{ fontSize: 40 }} /></div>)}
          </Form>
        </FormikProvider>
      )}
    </div>
  );
};

export default ResetPasswordForm;