import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Spinner from '../ui/spinner/Spinner';
import styles from './AddPropertyForm.module.scss';
import { useState, type SetStateAction } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import { useAddPropertyMutation } from './propertiesApiSlice';
import type { SearchDropdownOption } from '../ui/search/SearchDropdown';
import SearchDropdown from '../ui/search/SearchDropdown';
import { PropertyType, PropertyTypeDisplayNames } from './types';

type PropertyFormProps = {
  isModalOn: React.Dispatch<SetStateAction<boolean>>;
};

const propertySchema = Yup.object().shape({
  type: Yup.mixed<PropertyType>()
    .oneOf(Object.values(PropertyType))
    .required('Wybierz rodzaj lokalu'),
  building: Yup.string(),
  number: Yup.string().required('Podaj numer'),
  floor: Yup.number()
    .required('Podaj piętro')
    .integer('Podaj liczbę całkowitą'),
  total_area: Yup.number()
    .positive('Powierzchnia musi być > 0')
    .required('Podaj powierzchnię całkowitą lokalu'),
  usable_area: Yup.number()
    .positive('Powierzchnia musi być > 0')
    .required('Podaj powierzchnię użytkową lokalu'),
  description: Yup.string(),
  inhabitants: Yup.number()
    .positive('Liczba mieszkańców musi być > 0')
    .when('type', ([type], sch) => {
      return type === PropertyType.Flat
        ? sch.required('Podaj liczbę osób zamieszkujących mieszkanie')
        : sch.nullable();
    }),
  parent: Yup.number(),
});

const AddPropertyForm = ({ isModalOn }: PropertyFormProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );
  const [addProperty, { isLoading, isError, error }] = useAddPropertyMutation();

  const selectedCommunity = useAppSelector(selectSelectedCommunity);

  const getParentOptions = (data: any): SearchDropdownOption[] => {
    return data.results.map((property: any) => ({
      value: property.id,
      label: `${property.building} ${property.number} ${property.floor}`,
    }));
  };

  return (
    <div className={styles.container}>
      <h1>Dodaj lokal</h1>
      {isSuccess && (
        <div className={styles.success}>
          Dodano lokal
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
          initialValues={{
            type: '' as PropertyType,
            building: '',
            number: '',
            floor: '',
            total_area: '',
            usable_area: '',
            inhabitants: '',
            parent: '',
            description: '',
          }}
          validationSchema={propertySchema}
          onSubmit={async (values, { setSubmitting }) => {
            const numericValues = {
              ...values,
              floor: Number(values.floor),
              total_area: Number(values.total_area),
              usable_area: Number(values.usable_area),
              inhabitants:
                values.type === PropertyType.Flat
                  ? Number(values.inhabitants)
                  : null,
              parent: values.parent ? Number(values.parent) : null,
              hoa: selectedCommunity,
            };

            try {
              setIsWaiting(true);
              const response = await addProperty(numericValues).unwrap();
              setIsSuccess(true);
            } catch (error) {
              console.log(error);
              setIsSuccess(false);
            }
            setIsWaiting(false);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="type">Typ:</label>
                <Field as="select" name="type" className={styles.field}>
                  <option value="">Wybierz rodzaj</option>
                  {Object.values(PropertyType).map((type) => (
                    <option key={type} value={type}>
                      {PropertyTypeDisplayNames[type]}
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
                <label htmlFor="building">Budynek:</label>
                <Field name="building" type="text" className={styles.field} />
                <ErrorMessage
                  name="building"
                  component="div"
                  className={styles.error}
                />
              </div>
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
                <label htmlFor="floor">Piętro:</label>
                <Field name="floor" type="number" className={styles.field} />
                <ErrorMessage
                  name="floor"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="total_area">Powierzchnia całkowita:</label>
                <Field name="total_area" type="text" className={styles.field} />
                <ErrorMessage
                  name="total_area"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="usable_area">Powierzchnia użytkowa:</label>
                <Field
                  name="usable_area"
                  type="text"
                  className={styles.field}
                />
                <ErrorMessage
                  name="usable_area"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="inhabitants">Liczba mieszkańców:</label>
                <Field
                  name="inhabitants"
                  type="number"
                  className={styles.field}
                  disabled={values.type !== PropertyType.Flat}
                />
                <ErrorMessage
                  name="inhabitants"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <SearchDropdown
                  name="parent"
                  endpoint="/hoas/properties"
                  queryParams={{ hoa: selectedCommunity }}
                  label="Przynależy do lokalu:"
                  getOptions={getParentOptions}
                  disabled={[
                    PropertyType.Flat,
                    PropertyType.Common,
                    PropertyType.Business,
                  ].includes(values.type)}
                />
                <ErrorMessage
                  name="parent"
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
              <button type="submit" disabled={isSubmitting}>
                Dodaj lokal
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

export default AddPropertyForm;
