import { ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './AddRequestForm.module.scss';

import { useAppSelector } from '../../app/hooks';
import { useCreateRequest } from '../../features/requests/useCreateRequest';
import { useGetRequestTypes } from '../../features/request_types/useGetRequestTypes';
import { useNotifications } from '../alerts/NotificationContext';

import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import SearchDropdown, {
  type SearchDropdownOption,
} from '../ui/search/SearchDropdown';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import TextAreaLiveFeedback from '../common/forms/textInputLiveFeedback/TextAreaLiveFeedback';
import { Request, RequestType } from '../../features/requests/requestTypes';

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

  const { isLoading, data } = useGetRequestTypes({
    page: 1,
    pageSize: 50,
    hoaId,
  });

  const requestTypesOptions: SearchDropdownOption[] = data
    ? data.results?.map((type: RequestType) => ({
        value: type.id,
        label: `${type.title}`,
        key: type.id,
      }))
    : [];

  const formikProps: FormikWrapperProps<Partial<Request>> = {
    header: 'Dodaj Zgłoszenie',
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
            addNotification('Nowe zgłoszenie zostało dodane', 'success');
          },
          onError: (error: any) => {
            setErrors(error);
            setSubmitting(false);
          },
        },
      ),
    onCancel: onClose,
    validationSchema: validationSchema,
  };

  return (
    <FormikWrapper {...formikProps}>
      <div className={styles.fieldGroup}>
        <SearchDropdown
          name="type"
          isLoading={isLoading}
          options={requestTypesOptions}
          label="Typ:"
        />
        <ErrorMessage name="type" component="div" className={styles.error} />
      </div>
      <TextInputLiveFeedback label="Tytuł" type="text" name="title" />
      <TextAreaLiveFeedback label="Opis" name="description" />
    </FormikWrapper>
  );
};

export default AddRequestForm;
