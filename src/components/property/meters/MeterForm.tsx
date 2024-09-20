import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../ui/spinner/Spinner';
import styles from '../AddPropertyForm.module.scss';
import { useEffect, useState, type SetStateAction } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { setUpdatedMeters } from '../../../app/slices/propertiesState';
import GetMeterById from '../../../utils/GetMeterById';
import type { IMeter } from '../../../types/billingTypes';
import { MeterType } from '../../../types/billingTypes';
import { UpdateMeter } from '../../../utils/UpdateMeter';
import { CreateMeter } from '../../../utils/CreateMeterReading';
import { getMeterType } from '../propertyUtils';

type FormProps = {
  isModalOn: React.Dispatch<SetStateAction<boolean>>;
  propertyId: number;
  meterId?: number;
};

const meterSchema = Yup.object().shape({
  number: Yup.string().required('Podaj numer licznika'),
  type: Yup.mixed<MeterType>()
    .oneOf(Object.values(MeterType))
    .required('Wybierz rodzaj licznika'),
  unit_of_measurement: Yup.string().required('Podaj jednostkę'),
  installation_date: Yup.string().required('Podaj datę instalacji'),
});

const MeterForm = ({ isModalOn, propertyId, meterId }: FormProps) => {
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );
  const [initialData, setInitialData] = useState<IMeter | null>(null);

  useEffect(() => {
    if (meterId) {
      const fetchMeterData = async () => {
        setIsWaiting(true);
        try {
          const res = await GetMeterById(meterId);
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
      fetchMeterData();
    }
  }, [meterId]);

  if (isWaiting && !initialData && meterId) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1>{meterId ? 'Edytuj licznik' : 'Dodaj licznik'}</h1>
      {isSuccess && (
        <div className={styles.success}>
          {meterId ? 'Edytowano licznik' : 'Dodano licznik'}
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
        <Formik
          enableReinitialize
          initialValues={{
            number: initialData?.number || '',
            type: initialData?.type,
            unit_of_measurement: initialData?.unit_of_measurement || '',
            installation_date: initialData?.installation_date || '',
          }}
          validationSchema={meterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setIsWaiting(true);
            let res;
            if (meterId) {
              res = await UpdateMeter(meterId, values);
            } else {
              res = await CreateMeter(values);
            }
            if (res.status === 400) {
              setErrorMessages(res.data);
              console.log(res.data);
              setIsError(true);
            } else {
              setIsError(false);
              setIsSuccess(true);
            }
            setIsWaiting(false);
            setSubmitting(false);
            dispatch(setUpdatedMeters(true));
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="number">Numer:</label>
                <Field name="number" type="text" className={styles.field} />
                <ErrorMessage
                  name="number"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="type">Typ:</label>
                <Field as="select" name="type" className={styles.field}>
                  <option value="">Wybierz rodzaj</option>
                  {Object.values(MeterType).map((type) => (
                    <option key={type} value={type}>
                      {getMeterType(type)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="type"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="unit_of_measurement">Jednostka:</label>
                <Field
                  name="unit_of_measurement"
                  type="text"
                  className={styles.field}
                />
                <ErrorMessage
                  name="unit_of_measurement"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="installation_date">Data instalacji:</label>
                <Field
                  name="installation_date"
                  type="date"
                  className={styles.field}
                />
                <ErrorMessage
                  name="installation_date"
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
              <button type="submit" disabled={isSubmitting}>
                {meterId ? 'Zapisz' : 'Dodaj'}
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

export default MeterForm;
