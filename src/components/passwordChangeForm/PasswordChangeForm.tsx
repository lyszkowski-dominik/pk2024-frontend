import styles from './PasswordChangeForm.module.scss';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { ChangePassword } from '../../features/auth/ChangePassword';
import { CircularProgress } from '@mui/material';
import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import type { PasswordChangeFormProps } from '../../features/auth/passwordChangeFormTypes';

/**
 *
 * @param {PasswordChangeFormProps} params
 * @returns {JSX.Element} The `PasswordChangeForm` component returns a form for changing the password.
 */
const PasswordChangeForm = ({ isModalOn }: PasswordChangeFormProps) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    old_password?: string;
    new_password: string;
  } | null>(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password1: '',
      new_password2: '',
    },
    onSubmit: async (values) => {
      setIsWaiting(true);
      const res = await ChangePassword(values);
      console.log(res);
      if (res.status === 400) {
        setErrorMessages(res.data);
        setIsError(true);
      } else {
        setIsError(false);
        setIsSuccess(true);
        // isModalOn(false);
      }
      setIsWaiting(false);
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required('Stare hasło jest wymagane'),
      new_password1: Yup.string()
        .required('Nowe hasło jest wymagane')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .max(20, 'Hasło może mieć maksymalnie 20 znaków')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          'Hasło musi zawierać co najmniej jedną małą literę, jedną dużą literę i jedną cyfrę',
        )
        .notOneOf(
          [Yup.ref('old_password')],
          'Nowe hasło nie może być takie samo jak stare hasło',
        ),
      new_password2: Yup.string()
        .oneOf([Yup.ref('new_password1')], 'Hasła muszą być takie same')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .max(20, 'Hasło może mieć maksymalnie 20 znaków')
        .required('Powtórzenie hasła jest wymagane'),
    }),
  });

  return (
    <div className={styles.container}>
      <h1>Zmiana hasła</h1>
      {isSuccess && (
        <div className={styles.success}>
          Hasło zostało zmienione
          <div className={styles.buttons}>
            <button
              className={styles.cancel_button}
              type="button"
              onClick={() => {
                isModalOn(false);
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
      {!isSuccess && (
        <FormikProvider value={formik}>
          <Form>
            <TextInputLiveFeedback
              label="Stare hasło"
              name="old_password"
              type="password"
            />
            <TextInputLiveFeedback
              label="Nowe hasło"
              name="new_password1"
              type="password"
            />
            <TextInputLiveFeedback
              label="Powtórz nowe hasło"
              name="new_password2"
              type="password"
            />
            {isError && (
              <div className={styles.error}>
                {errorMessages?.old_password && (
                  <p>{errorMessages.old_password}</p>
                )}
                {errorMessages?.new_password && (
                  <p>{errorMessages.new_password}</p>
                )}
              </div>
            )}
            {!isWaiting && (
              <div className={styles.buttons}>
                <button className={styles.change} type="submit">
                  Zmień hasło
                </button>
                <button
                  className={styles.cancel}
                  type="reset"
                  onClick={() => {
                    isModalOn(false);
                  }}
                >
                  Anuluj
                </button>
              </div>
            )}
            {isWaiting && (
              <div className={styles.waiting}>
                <CircularProgress color="primary" sx={{ fontSize: 40 }} />
              </div>
            )}
          </Form>
        </FormikProvider>
      )}
    </div>
  );
};

export default PasswordChangeForm;
