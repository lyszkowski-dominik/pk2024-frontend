import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../ui/spinner/Spinner';
import styles from './AddRequestForm.module.scss';
import { useState, type SetStateAction } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../ui/search/SearchDropdown';
import SearchDropdown from '../ui/search/SearchDropdown';
import { Button } from '@mui/material';
import { useNotifications } from '../alerts/NotificationContext';
import { CreateRequest } from '../../features/requests/CreateRequest';

const propertySchema = Yup.object().shape({
  title: Yup.string().required('Podaj tytuł'),
  description: Yup.string(),
  type: Yup.number(),
});

/**
 * @param {React.Dispatch<SetStateAction<boolean>>} isModalOn The `isModalOn` function is a callback function that closes the form.
 * @param {function} refreshList The `refreshList` function is a callback function that refreshes the list of requests.
 */
export type RequestFormProps = {
  isModalOn: React.Dispatch<SetStateAction<boolean>>;
  refreshList: () => void;
};

/**
 * 
 * @param {RequestFormProps} params
 * @returns {JSX.Element} The `AddRequestForm` component returns a form for adding a request.
 */
const AddRequestForm = ({ isModalOn }: RequestFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );
  const { addNotification } = useNotifications();

  const selectedCommunity = useAppSelector(selectSelectedCommunity);

  const getParentOptions = (data: any): SearchDropdownOption[] => {
    return data.results?.map((type: any) => ({
      value: type.id,
      label: `${type.title}`,
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Dodaj Zapytanie</h1>
      {!isSuccess && selectedCommunity && (
        <Formik
          initialValues={{
            title: '',
            description: '',
            type: '',
          }}
          validationSchema={propertySchema}
          onSubmit={async (values, { setSubmitting }) => {
            const numericValues = {
              ...values,
              type: Number(values.type),
              hoa: selectedCommunity,
            };

            const res = await CreateRequest(numericValues);
            if (res.status === 400) {
              setErrorMessages(res.data);
              console.log(res.data);
              setIsError(true);
            } else {
              setIsError(false);
              setIsSuccess(true);
              addNotification('Nowy zapytanie zostało dodane', 'success');
              isModalOn(false);
            }
            setIsWaiting(false);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <SearchDropdown
                  name="type"
                  endpoint="/requests/request_types/"
                  // queryParams={{ hoa: selectedCommunity }}
                  label="Typ:"
                  getOptions={getParentOptions}
                  // disabled={[
                  //   PropertyType.Flat,
                  //   PropertyType.Common,
                  //   PropertyType.Business,
                  // ].includes(values.type)}
                />
                <ErrorMessage
                  name="type"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="title">Tytuł:</label>
                <Field name="title" type="text" className={styles.field} />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor="description">Opis:</label>
                <Field
                  name="description"
                  as="textarea"
                  className={styles.field}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.error}
                />
              </div>

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Dodaj zapytanie
              </Button>
              <Button
                color="secondary"
                type="reset"
                onClick={() => {
                  isModalOn(false);
                }}
              >
                Anuluj
              </Button>
              {isWaiting && (
                <div className={styles.waiting}>
                  <Spinner />
                </div>
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddRequestForm;
