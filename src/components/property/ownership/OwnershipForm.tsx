import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../ui/spinner/Spinner';
import styles from '../AddPropertyForm.module.scss';
import { useEffect, useState, type SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../../ui/search/SearchDropdown';
import SearchDropdown from '../../ui/search/SearchDropdown';
import { CreateOwnership } from '../../../features/ownerships/CreateOwnership';
import type { IOwnership } from '../../../features/ownerships/ownershipTypes';
import GetOwnershipById from '../../../features/ownerships/GetOwnershipById';
import { UpdateOwnership } from '../../../features/ownerships/UpdateOwnership';
import { setUpdatedOwnerships } from '../../../features/properties/propertiesState';
import { Button } from '@mui/material';
import { useNotifications } from '../../notifications/NotificationContext';
import type { User } from '../../../features/users/usersTypes';

/**
 * @param {boolean} isModalOn - The `isModalOn` function is a callback function that closes the form.
 * @param {number} propertyId - The `propertyId` property represents the id of the property.
 * @param {number} ownershipId - The `ownershipId` property represents the id of the ownership.
 */
export type FormProps = {
  isModalOn: React.Dispatch<SetStateAction<boolean>>;
  propertyId: number;
  ownershipId?: number;
};

const ownershipSchema = Yup.object().shape({
  owners: Yup.array().required('Dodaj właściciela'),
  start: Yup.string().required('Podaj datę nabycia'),
});

/**
 *
 * @param {FormProps} params
 * @returns {JSX.Element} The `OwnershipForm` component returns a form for adding or editing ownership.
 */
const OwnershipForm = ({ isModalOn, propertyId, ownershipId }: FormProps) => {
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );
  const [initialData, setInitialData] = useState<IOwnership | null>(null);
  const selectedCommunity = useAppSelector(selectSelectedCommunity);
  const { addNotification } = useNotifications();
  useEffect(() => {
    if (ownershipId) {
      const fetchOwnershipData = async () => {
        setIsWaiting(true);
        try {
          const res = await GetOwnershipById(ownershipId);
          if (res?.status === 200) {
            setInitialData(res.data);
          } else {
            setErrorMessages(res?.data);
          }
        } catch (error: any) {
          setErrorMessages(error);
        } finally {
          setIsWaiting(false);
        }
      };
      fetchOwnershipData();
    }
  }, [ownershipId]);

  const getUserOptions = (data: any): SearchDropdownOption[] => {
    return data.results?.map((owner: User) => ({
      value: owner.id,
      label: `${owner.first_name} ${owner.last_name} [${owner.email}]`,
    }));
  };

  if (isWaiting && !initialData && ownershipId) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1>{ownershipId ? 'Edytuj właściciela' : 'Dodaj właściciela'}</h1>
      {/* {isSuccess && (
        <div className={styles.success}>
          {ownershipId ? 'Edytowano właściciela' : 'Dodano właściciela'}
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
      )} */}
      {!isSuccess && selectedCommunity && (
        <Formik
          enableReinitialize
          initialValues={{
            owners: initialData?.owners || [],
            start: initialData?.start || '',
            property: propertyId,
            ...(initialData?.end ? { end: initialData.end } : {}),
          }}
          validationSchema={ownershipSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setIsWaiting(true);
            let res;
            if (ownershipId) {
              res = await UpdateOwnership(ownershipId, values);
            } else {
              res = await CreateOwnership(values);
            }
            if (res.status === 400) {
              setErrorMessages(res.data);
              console.log(res.data);
              setIsError(true);
            } else {
              setIsError(false);
              setIsSuccess(true);
              addNotification('Właściciele zostali dodani.', 'success');
              isModalOn(false);
            }
            setIsWaiting(false);
            setSubmitting(false);
            dispatch(setUpdatedOwnerships(true));
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <SearchDropdown
                  name="owners"
                  endpoint={`/hoas/hoas/${selectedCommunity}/owners`}
                  label="Właściciele"
                  getOptions={getUserOptions}
                  multiselect={true}
                  value={values.owners.map((owner: User) => ({
                    value: owner.id,
                    label: `${owner.first_name} ${owner.last_name} [${owner.email}]`,
                  }))}
                />
                <ErrorMessage
                  name="owners"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="start">Data nabycia:</label>
                <Field name="start" type="date" className={styles.field} />
                <ErrorMessage
                  name="start"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="end">Data zbycia:</label>
                <Field name="end" type="date" className={styles.field} />
                <ErrorMessage
                  name="end"
                  component="div"
                  className={styles.error}
                />
              </div>
              {isError && (
                <div className={styles.error}>
                  {Object.entries(errorMessages || {}).map(([key, value]) => (
                    <div>{value}</div>
                  ))}
                </div>
              )}
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                {ownershipId ? 'Zapisz' : 'Dodaj'}
              </Button>
              <Button
                className={styles.cancel}
                type="reset"
                color="secondary"
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

export default OwnershipForm;
