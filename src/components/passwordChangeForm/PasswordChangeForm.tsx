import styles from './PasswordChangeForm.module.scss';
import { Form, FormikProvider, useFormik, useField } from 'formik';
import type React from 'react';
import type { SetStateAction } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { ChangePassword } from '../../utils/ChangePassword';
import { CircularProgress } from '@mui/material';

type PasswordChangeFormProps = {
  isModalOn: React.Dispatch<SetStateAction<boolean>>
}

type TextInputLiveFeedbackProps = {
  label: string,
  helpText?: string,
  type: string,
  id?: string,
  name: string
}

// @ts-ignore
const TextInputLiveFeedback = ({ label, helpText, ...props }: TextInputLiveFeedbackProps) => {
  // @ts-ignore
  const [field, meta] = useField(props);

  // Show inline feedback if EITHER
  // - the input is focused AND value is longer than 2 characters
  // - or, the has been visited (touched === true)
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={`${styles.form_control} ${showFeedback ? (meta.error ? styles.invalid : styles.valid) : ''}`}
    >
      <div>
        <label htmlFor={props.id}>{label}</label>{' '}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className={`${styles.feedback} ${styles.text_sm}`}
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
      />
      {/*@ts-ignore*/}
      <div className={styles.text_xs} id={`${props.id}-help`} tabIndex="-1">
        {helpText}
      </div>
    </div>
  );
};

const PasswordChangeForm = ({ isModalOn }: PasswordChangeFormProps) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const formik = useFormik({
    initialValues: {
      old_password: '',
      new_password1: '',
      new_password2: ''
    },
    onSubmit: async (values) => {
      setIsWaiting(true);
      const res = await ChangePassword(values);
      console.log(res);
      if (res.status === 200) {
        alert('Hasło zostało zmienione');
        isModalOn(false);
      } else {
        alert('Wystąpił błąd podczas zmiany hasła');
      }
      setIsWaiting(false);
    },
    validationSchema: Yup.object({
      old_password: Yup.string().required('Stare hasło jest wymagane'),
      // .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
      new_password1: Yup.string().required('Nowe hasło jest wymagane')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .max(20, 'Hasło może mieć maksymalnie 20 znaków')
        .required('Nowe hasło jest wymagane')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          'Hasło musi zawierać co najmniej jedną małą literę, jedną dużą literę i jedną cyfrę'
        )
        .notOneOf([Yup.ref('old_password')], 'Nowe hasło nie może być takie samo jak stare hasło'),
      new_password2: Yup.string().oneOf([Yup.ref('new_password1')], 'Hasła muszą być takie same')
        .min(8, 'Hasło musi mieć co najmniej 8 znaków')
        .max(20, 'Hasło może mieć maksymalnie 20 znaków')
        .required('Powtórzenie hasła jest wymagane')
    })
  });

  return (
    <div className={styles.container}>
      <h1>Zmiana hasła</h1>
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
          {!isWaiting && (
            <div className={styles.buttons}>
              <button className={styles.change} type="submit">Zmień hasło</button>
              <button className={styles.cancel} type="button" onClick={() => {
                isModalOn(false);
              }}>Anuluj
              </button>
            </div>
          )
          }
          {isWaiting &&  (<div className={styles.waiting}><CircularProgress color="primary" sx={{ fontSize: 40 }} /></div>)}
        </Form>
      </FormikProvider>
    </div>
  )
    ;
};


export default PasswordChangeForm;