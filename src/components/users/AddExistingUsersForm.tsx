import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import SearchDropdown, {
  type SearchDropdownOption,
} from '../ui/search/SearchDropdown';
import type { User } from '../../features/users/usersTypes';
import { useAddExistingUser } from '../../features/users/useAddExistingUser';
import type { UserRole } from '../../types/types';
import { useNotifications } from '../alerts/NotificationContext';
import * as Yup from 'yup';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import { useGetUsers } from '../../features/auth/useGetUsers';

export const AddExistingUsersForm = ({
  onClose,
  role,
  disabled,
}: {
  onClose: () => void;
  role: UserRole;
  disabled: boolean;
}) => {
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { addNotification } = useNotifications();
  const addUser = useAddExistingUser(hoaId, role);

  const { isLoading, data } = useGetUsers({
    page: 1,
    pageSize: 50,
    role: role,
    excludeHoa: hoaId,
  });

  const usersDropdownOptions: SearchDropdownOption[] = data
    ? data.results?.map((user: User) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name} [${user.email}]`,
        key: user.id,
      }))
    : [];

  const formikProps: FormikWrapperProps<{ id: number | null }> = {
    header: 'Dodawanie użytkownika',
    submitLabel: 'Dodaj',
    initialValues: { id: null },
    onSubmit: (values, { setErrors, setFieldError }) => {
      const userId = values.id;
      if (!userId) {
        setFieldError('id', 'Nie wybrano użytkownika.');
      } else {
        addUser.mutate(
          { role, hoaId, userId },
          {
            onSuccess: () => {
              onClose();
              addNotification('Użytkownik został dodany.', 'success');
            },
            onError: (error) => {
              setErrors({ id: error.message });
            },
          },
        );
      }
    },
    onCancel: onClose,
    validationSchema: Yup.object({
      id: Yup.number().required('Wybierz użytkownika'),
    }),
    disabled: disabled,
  };

  return (
    <FormikWrapper {...formikProps}>
      {() => (
        <>
          <SearchDropdown
            name="id"
            isLoading={isLoading}
            label="Użytkownicy"
            options={usersDropdownOptions}
            disabled={disabled}
            cleanOnDisabling={true}
          />
        </>
      )}
    </FormikWrapper>
  );
};
