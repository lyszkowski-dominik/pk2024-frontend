import { Form, FormikProvider, useFormik } from 'formik';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import TextAreaLiveFeedback from '../forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { useAppDispatch } from '../../app/hooks';
import { editResolution } from '../../features/resolutions/resolutionsSlice';

/**
 * @property {function} onCancel The `onCancel` function is a callback function that closes the form.
 * @property {function} onSubmit The `onSubmit` function is a callback function that refreshes the list of resolutions.
 * @property {any} initialData The `initialData` object contains the initial data of the resolution.
 */
export type EditResolutionFormProps = {
  onCancel: () => void;
  onSubmit: () => void | null;
  initialData: any;
};

/**
 *
 * @param {EditResolutionFormProps} params
 * @returns {JSX.Element} The `EditResolutionForm` component returns a form for editing a resolution.
 */
const EditResolutionForm = ({
  onCancel,
  onSubmit: onSubmitCallback,
  initialData,
}: EditResolutionFormProps) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    title?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    hoaID?: number;
  } | null>(null);
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: async (values) => {
      setIsWaiting(true);
      const res = await dispatch(
        editResolution({ ...values, id: initialData.id }),
      );

      if (editResolution.fulfilled.match(res)) {
        setIsError(false);
        setIsSuccess(true);
        onCancel();
      } else {
        setIsError(true);
      }
      setIsWaiting(false);
      onSubmitCallback && onSubmitCallback();
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Tytuł jest wymagany'),
      description: Yup.string().required('Opis jest wymagany'),
      start_date: Yup.string().required('Data rozpoczęcia jest wymagana'),
      end_date: Yup.string().required('Data zakońzcenia jest wymagana'),
    }),
  });

  return (
    <div className={styles.container}>
      <h1>Edycja uchwały</h1>
      {/* {isSuccess && (
        <div className={styles.success}>
          Uchwała została uaktualniona.
          <div className={styles.buttons}>
            <button
              className={styles.cancel_button}
              type="button"
              onClick={onCancel}
            >
              Zamknij
            </button>
          </div>
        </div>
      )} */}
      {!isSuccess && (
        <FormikProvider value={formik}>
          <Form style={{ width: '100%' }}>
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
            {isError && (
              <div className={styles.error}>
                {Object.entries(errorMessages || {}).map(([key, value]) => (
                  <div>{value}</div>
                ))}
              </div>
            )}
            {!isWaiting && (
              <div className={styles.buttons}>
                <Button
                  className={styles.change}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Zapisz
                </Button>
                <Button
                  className={styles.cancel}
                  color="secondary"
                  type="reset"
                  onClick={onCancel}
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
      )}
    </div>
  );
};

export default EditResolutionForm;
