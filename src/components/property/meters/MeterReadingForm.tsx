import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../../ui/spinner/Spinner';
import styles from '../AddPropertyForm.module.scss';
import { useEffect, useState, type SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { setUpdatedMeterReadings } from '../../../features/properties/propertiesState';
import { type IMeterReading } from '../../../features/billings/billingTypes';
import GetMeterReadingById from '../../../features/meter_readings/GetMeterReadingById';
import { UpdateMeterReading } from '../../../features/meter_readings/UpdateMeterReadings';
import { CreateMeterReading } from '../../../features/meters/CreateMeter';

type FormProps = {
  isModalOn: React.Dispatch<SetStateAction<boolean>>;
  meterId: number;
  readingId?: number;
};

const readingSchema = Yup.object().shape({
  reading_date: Yup.string().required('Podaj datę odczytu'),
  reading_value: Yup.string().required('Podaj wartość odczytu'),
});

const MeterReadingForm = ({ isModalOn, meterId, readingId }: FormProps) => {
  const dispatch = useAppDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );
  const [initialData, setInitialData] = useState<IMeterReading | null>(null);
  const selectedCommunity = useAppSelector(selectSelectedCommunity);

  useEffect(() => {
    if (readingId) {
      const fetchReadingData = async () => {
        setIsWaiting(true);
        try {
          const res = await GetMeterReadingById(readingId);
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
      fetchReadingData();
    }
  }, [readingId]);

  if (isWaiting && !initialData && readingId) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <h1>{readingId ? 'Edytuj odczyt' : 'Dodaj odczyt'}</h1>
      {isSuccess && (
        <div className={styles.success}>
          {readingId ? 'Edytowano odczyt' : 'Dodano odczyt'}
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
      {!isSuccess && selectedCommunity && (
        <Formik
          enableReinitialize
          initialValues={{
            meter: meterId,
            reading_date: initialData?.reading_date || '',
            reading_value: initialData?.reading_value || 0,
          }}
          validationSchema={readingSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setIsWaiting(true);
            let res;
            if (readingId) {
              res = await UpdateMeterReading(readingId, {
                ...values,
                reading_value: `${values.reading_value}`,
              });
            } else {
              res = await CreateMeterReading({
                ...values,
                reading_value: `${values.reading_value}`,
              });
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
            dispatch(setUpdatedMeterReadings(true));
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <h2>{`Odczyt licznika: ${initialData?.meter_number}`}</h2>
              <div className={styles.fieldGroup}>
                <label htmlFor="reading_date">Data odczytu:</label>
                <Field
                  name="reading_date"
                  type="date"
                  className={styles.field}
                />
                <ErrorMessage
                  name="reading_date"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="reading_value">Wartość:</label>
                <Field
                  name="reading_value"
                  type="number"
                  className={styles.field}
                />
                <ErrorMessage
                  name="reading_value"
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
                {readingId ? 'Zapisz' : 'Dodaj'}
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

export default MeterReadingForm;