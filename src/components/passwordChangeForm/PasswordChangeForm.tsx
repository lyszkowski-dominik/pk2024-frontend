import styles from './PasswordChangeForm.module.scss';
import { Form, FormikProvider, useFormik,useField } from 'formik';
import type React from 'react';
import type { SetStateAction } from 'react';
import { useState } from 'react';
import * as Yup from 'yup';

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
const TextInputLiveFeedback = ({ label, helpText, ...props } : TextInputLiveFeedbackProps) => {
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

const PasswordChangeForm = ({isModalOn}: PasswordChangeFormProps) => {
    const formik = useFormik({
      initialValues: {
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
      },
      onSubmit: (values) => {
        console.log(values);
      },
      validationSchema: Yup.object({
        oldPassword: Yup.string().required('Stare hasło jest wymagane')
          .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
        newPassword: Yup.string().required('Nowe hasło jest wymagane')
          .min(8, 'Hasło musi mieć co najmniej 8 znaków')
          .max(20, 'Hasło może mieć maksymalnie 20 znaków')
          .required('Nowe hasło jest wymagane')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            'Hasło musi zawierać co najmniej jedną małą literę, jedną dużą literę i jedną cyfrę'
          ),
        newPasswordRepeat: Yup.string().oneOf([Yup.ref('newPassword')], 'Hasła muszą być takie same')
          .min(8, 'Hasło musi mieć co najmniej 8 znaków')
          .max(20, 'Hasło może mieć maksymalnie 20 znaków')
          .required('Powtórzenie hasła jest wymagane')
      })
    })

    return (
      <div className={styles.container}>
        <h1>Zmiana hasła</h1>
        <FormikProvider value={formik}>
          <Form>
            <TextInputLiveFeedback
              label="Stare hasło"
              name="oldPassword"
              type="password"
            />
            <TextInputLiveFeedback
              label="Nowe hasło"
              name="newPassword"
              type="password"
            />
            <TextInputLiveFeedback
              label="Powtórz nowe hasło"
              name="newPasswordRepeat"
              type="password"
            />
            <div className={styles.buttons}>
              <button className={styles.change} type="submit">Zmień hasło</button>
              <button className={styles.cancel} type="button" onClick={()=>{
                isModalOn(false)
              }}>Anuluj</button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    )
  }


export default PasswordChangeForm