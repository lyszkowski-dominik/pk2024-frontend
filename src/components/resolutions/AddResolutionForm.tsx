import { Form, FormikProvider, useFormik } from 'formik';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import TextAreaLiveFeedback from '../forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { createResolution } from '../../features/resolutions/resolutionsSlice';

/**
 *
 * @param {function} onCancel The `onCancel` function is a callback function that closes the form.
 * @returns {JSX.Element} The `AddResolutionForm` component returns a form for adding a resolution.
 */
const AddResolutionForm = ({ onCancel }: { onCancel: () => void }) => {
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
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      hoa: hoaID,
    },
    onSubmit: async (values) => {
      setIsWaiting(true);
      const res = await dispatch(createResolution(values));

      if (createResolution.fulfilled.match(res)) {
        setIsError(false);
        setIsSuccess(true);
        onCancel();
      } else {
        setIsError(true);
      }
      setIsWaiting(false);
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
      <h1>Dodawanie nowej uchwały</h1>
      {/* {isSuccess && (
        <div className={styles.success}>
          Uchwała została dodana.
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
              type="date"
              name="start_date"
            />
            <TextInputLiveFeedback
              label="Data zakończenia"
              type="date"
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
                  Dodaj
                </Button>
                <Button
                  className={styles.cancel}
                  type="reset"
                  color="secondary"
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

export default AddResolutionForm;
