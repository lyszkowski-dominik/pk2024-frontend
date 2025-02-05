import Spinner from '../../ui/spinner/Spinner';
import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import type { SearchDropdownOption } from '../../ui/search/SearchDropdown';
import SearchDropdown from '../../ui/search/SearchDropdown';
import { useNotifications } from '../../alerts/NotificationContext';
import type { User } from '../../../features/users/usersTypes';
import { useGetHoaUsers } from '../../../features/users/useGetHoaUsers';
import { UserRole } from '../../../types/types';
import { useCreateOwnership } from '../../../features/ownerships/useCreateOwnership';
import { useEditOwnership } from '../../../features/ownerships/useEditOwnership';
import FormikWrapper, {
  FormikWrapperProps,
} from '../../common/forms/form/FormikWrapper';
import { useGetOwnership } from '../../../features/ownerships/useGetOwnershipById';
import { validationSchema } from './ownershipUtils';
import TextInputLiveFeedback from '../../common/forms/textInputLiveFeedback/TextInputLiveFeedback';

export type FormProps = {
  onClose: () => void;
  propertyId: number;
  ownershipId?: number;
};

const OwnershipForm = ({ onClose, propertyId, ownershipId }: FormProps) => {
  const hoaId = useAppSelector(selectSelectedCommunity) ?? -1;
  const { addNotification } = useNotifications();

  const createOwnership = useCreateOwnership(propertyId);
  const editOwnership = useEditOwnership(ownershipId || -1, propertyId);
  const mutation = ownershipId ? editOwnership : createOwnership;
  const {
    data: initialData,
    isLoading,
    isError,
    error,
  } = useGetOwnership(ownershipId || -1);
  const { isLoading: loadingUsers, data: owners } = useGetHoaUsers({
    page: 1,
    pageSize: 1000,
    hoaId: hoaId,
    role: UserRole.Owner,
  });

  const formikProps: FormikWrapperProps<any> = {
    header: ownershipId ? 'Edytuj właściciela' : 'Dodaj właściciela',
    submitLabel: ownershipId ? 'Zapisz' : 'Dodaj',
    initialValues: {
      id: ownershipId || undefined,
      owners: initialData?.owners.map((owner) => owner.id) || [],
      start: initialData?.start || '',
      property: propertyId,
      ...(initialData?.end ? { end: initialData.end } : {}),
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) =>
      mutation.mutate(values, {
        onSuccess: () => {
          onClose();
          addNotification(
            ownershipId
              ? 'Zaktualizowane dane właścicieli'
              : 'Właściciele zostali dodani',
            'success',
          );
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      }),
    onCancel: onClose,
  };

  const ownersDropdownOptions: SearchDropdownOption[] = owners
    ? owners.results?.map((user: User) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name} [${user.email}]`,
        key: user.id,
      }))
    : [];

  if (isLoading) {
    return <Spinner />;
  }
  if (ownershipId && !initialData) return <div>Brak danych</div>;
  if (isError) return <div>Błąd: {error.message}</div>;

  return (
    <FormikWrapper {...formikProps}>
      {(formik) => {
        return (
          <>
            <SearchDropdown
              name="owners"
              label="Właściciele"
              options={ownersDropdownOptions}
              isLoading={loadingUsers}
              multiselect={true}
            />
            <TextInputLiveFeedback
              label="Data nabycia"
              type="date"
              name="start"
            />
            <TextInputLiveFeedback
              label="Data sprzedaży"
              type="date"
              name="end"
            />
          </>
        );
      }}
    </FormikWrapper>
  );
};

export default OwnershipForm;
