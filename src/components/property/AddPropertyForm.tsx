import { ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import styles from './AddPropertyForm.module.scss';
import { type SetStateAction } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../ui/search/SearchDropdown';
import SearchDropdown from '../ui/search/SearchDropdown';
import { PropertyForm, PropertyType, PropertyTypeDisplayNames } from './types';
import { useNotifications } from '../alerts/NotificationContext';
import { useCreateProperty } from '../../features/properties/useCreateProperty';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import TextAreaLiveFeedback from '../common/forms/textInputLiveFeedback/TextAreaLiveFeedback';

/**
 * @property {React.Dispatch<SetStateAction<boolean>>} isModalOn - The `isModalOn` property represents a function that sets the modal state.
 */
export type PropertyFormProps = {
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

/**
 *
 * @param {PropertyFormProps} params
 * @returns {JSX.Element} The `AddPropertyForm` component returns a form for adding a new property.
 */
const AddPropertyForm = ({ onClose }: { onClose: () => void }) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createProperty = useCreateProperty(hoaId);

  const getParentOptions = (data: any): SearchDropdownOption[] => {
    return data.results?.map((property: any) => ({
      value: property.id,
      label: `${property.building} ${property.number} ${property.floor}`,
    }));
  };

  const formikProps: FormikWrapperProps<Partial<PropertyForm>> = {
    header: 'Dodaj lokal',
    submitLabel: 'Dodaj',
    initialValues: {
      type: '' as PropertyType,
      building: '',
      number: '',
      description: '',
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const numericValues = {
        ...values,
        floor: Number(values.floor),
        total_area: Number(values.total_area),
        usable_area: Number(values.usable_area),
        inhabitants:
          values.type === PropertyType.Flat ? Number(values.inhabitants) : null,
        parent: values.parent ? Number(values.parent) : null,
        hoa: hoaId,
      };

      createProperty.mutate(
        { ...numericValues },
        {
          onSuccess: () => {
            onClose();
            addNotification('Nowy lokal został dodany', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      );
    },
    onReset: onClose,
    validationSchema: propertySchema,
  };

  return (
    <FormikWrapper {...formikProps}>
      {(formik) => (
        <>
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
          <TextInputLiveFeedback label="Budynek" type="text" name="building" />
          <TextInputLiveFeedback label="Numer" type="text" name="number" />
          <TextInputLiveFeedback label="Piętro" type="text" name="floor" />
          <TextInputLiveFeedback
            label="Powierzchnia całkowita"
            type="text"
            name="total_area"
          />
          <TextInputLiveFeedback
            label="Powierzchnia użytkowa"
            type="text"
            name="usable_area"
          />
          <TextInputLiveFeedback
            label="Liczba mieszkańców"
            type="number"
            name="inhabitants"
            disabled={formik.values.type !== PropertyType.Flat}
          />

          <div className={styles.fieldGroup}>
            <SearchDropdown
              name="parent"
              endpoint="/hoas/properties"
              queryParams={{ hoa: hoaId }}
              label="Przynależy do lokalu:"
              getOptions={getParentOptions}
              disabled={
                !formik.values.type ||
                [
                  PropertyType.Flat,
                  PropertyType.Common,
                  PropertyType.Business,
                ].includes(formik.values.type)
              }
            />
            <ErrorMessage
              name="parent"
              component="div"
              className={styles.error}
            />
          </div>
          <TextAreaLiveFeedback label="Opis" name="description" />
        </>
      )}
    </FormikWrapper>
  );
};

export default AddPropertyForm;
