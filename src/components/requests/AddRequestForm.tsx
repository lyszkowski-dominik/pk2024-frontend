import { ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './AddRequestForm.module.scss';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../ui/search/SearchDropdown';
import SearchDropdown from '../ui/search/SearchDropdown';
import { useNotifications } from '../alerts/NotificationContext';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import { useCreateRequest } from '../../features/requests/useCreateRequest';

import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import TextAreaLiveFeedback from '../common/forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { Request } from '../../features/requests/requestTypes';

const validationSchema = Yup.object({
  title: Yup.string().required('Podaj tytuł'),
  description: Yup.string(),
});

export type RequestFormProps = {
  onClose: () => void;
};

const AddRequestForm = ({ onClose }: RequestFormProps) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const createRequest = useCreateRequest(hoaId);

  const getParentOptions = (data: any): SearchDropdownOption[] => {
    return data.results?.map((type: any) => ({
      value: type.id,
      label: `${type.title}`,
    }));
  };

  const formikProps: FormikWrapperProps<Partial<Request>> = {
    header: 'Dodaj Zapytanie',
    submitLabel: 'Dodaj',
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: (values, { setSubmitting, setErrors }) =>
      createRequest.mutate(
        { ...values, type: { id: Number(values.type) }, hoa: hoaId },
        {
          onSuccess: () => {
            onClose();
            addNotification('Nowy zapytanie zostało dodane', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      ),
    onReset: onClose,
    validationSchema: validationSchema,
  };

  return (
    <FormikWrapper {...formikProps}>
      <div className={styles.fieldGroup}>
        <SearchDropdown
          name="type"
          endpoint="/requests/request_types/"
          label="Typ:"
          getOptions={getParentOptions}
        />
        <ErrorMessage name="type" component="div" className={styles.error} />
      </div>
      <TextInputLiveFeedback label="Tytuł" type="text" name="title" />
      <TextAreaLiveFeedback label="Opis" name="description" />
    </FormikWrapper>
  );
};

export default AddRequestForm;
