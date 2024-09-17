import { Form, FormikProvider, useFormik } from 'formik';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import TextAreaLiveFeedback from '../forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { EditResolution } from '../../utils/EditResolution';
import { useNotifications } from '../notifications/NotificationContext';

type EditResolutionFormProps = {
  onCancel: () => void;
  onSubmit: () => void | null;
  initialData: any;
};

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
  const { addNotification } = useNotifications();


  const formik = useFormik({
    initialValues: initialData,
    onSubmit: async (values) => {
      setIsWaiting(true);
      const res = await EditResolution(initialData.id, values);

      if (res.status === 400) {
        setErrorMessages(res.data);
        setIsError(true);
      } else {
        setIsError(false);
        setIsSuccess(true);
        addNotification("Uchwałą zostałą edytowana.", 'success');
        onCancel();
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
