import { Form, FormikProvider, useFormik } from 'formik';
import TextInputLiveFeedback from '../forms/textInputLiveFeedback/TextInputLiveFeedback';
import styles from '../passwordChangeForm/PasswordChangeForm.module.scss';
import { Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import TextAreaLiveFeedback from '../forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { CreateNewNotification } from '../../utils/CreateNewNotification';
import { useNotifications } from './NotificationContext';

/**
 * 
 * @param {function} onCancel The `onCancel` function is a callback function that closes the form.
 * @returns {JSX.Element} The `AddNotificationForm` component returns a form for adding a new notification.
 */
const AddNotificationForm = ({ onCancel }: { onCancel: () => void }) => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    message?: string;
    description?: string;
    link?: string;
    hoaID?: number;
  } | null>(null);
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const { addNotification } = useNotifications();
  const formik = useFormik({
    initialValues: {
      message: '',
      description: '',
      link: '',
      hoa: hoaID,
    },
    onSubmit: async (values) => {
      setIsWaiting(true);
      const res = await CreateNewNotification(values);

      if (res.status === 400) {
        setErrorMessages(res.data);
        setIsError(true);
      } else {
        setIsError(false);
        setIsSuccess(true);
        onCancel();
        addNotification("Powiadomienie zostało dodane.", "success");
      }
      setIsWaiting(false);
    },
    validationSchema: Yup.object({
      message: Yup.string().required('Wiadomość jest wymagany'),
    }),
  });

  return (
    <div className={styles.container}>
      <h1>Dodawanie nowego powiadomienia</h1>
      {/* {isSuccess && (
        <div className={styles.success}>
          Powiadomienie wysłane.
          <div className={styles.buttons}>
            <Button
              className={styles.cancel_button}
              type="button"
              onClick={onCancel}
            >
              Zamknij
            </Button>
          </div>
        </div>
      )} */}
      {!isSuccess && (
        <FormikProvider value={formik}>
          <Form style={{ width: '100%' }}>
            <TextInputLiveFeedback
              label="Wiadomość"
              type="text"
              name="message"
            />
            <TextAreaLiveFeedback label="Opis" name="description" />
            <TextInputLiveFeedback label="Link" type="text" name="link" />
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
                  color='secondary'
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

export default AddNotificationForm;
