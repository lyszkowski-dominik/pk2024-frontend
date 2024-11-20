import { ErrorMessage } from 'formik';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import styles from './ExistingUsers.module.scss';
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

export const AddExistingUsersForm = ({
  isModalOn,
  role,
}: {
  isModalOn: (value: boolean) => void;
  role: UserRole;
}) => {
  const [userData] = useState<any[]>([]);
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const { addNotification } = useNotifications();
  const addUser = useAddExistingUser(hoaId, role);

  const getUserOptions = (data: any): SearchDropdownOption[] => {
    return data.results?.map((owner: User) => ({
      value: owner.id,
      label: `${owner.first_name} ${owner.last_name} [${owner.email}]`,
      key: owner.id,
    }));
  };

  const formikProps: FormikWrapperProps<{ userId: number }> = {
    header: 'Dodawanie istniejącego użytkownika',
    submitLabel: 'Dodaj',
    initialValues: {
      userId: -1,
    },
    onSubmit: (values, { setErrors }) => {
      const userId = values.userId;
      addUser.mutate(
        { role, hoaId, userId },
        {
          onSuccess: () => {
            isModalOn(false);
            addNotification('Użytkownik został dodany.', 'success');
          },
          onError: (error) => {
            setErrors({ userId: error.message });
          },
        },
      );
    },
    onReset: () => isModalOn(false),
    validationSchema: Yup.object({
      userId: Yup.number().required('Wybierz użytkownika'),
    }),
  };

  return (
    <FormikWrapper {...formikProps}>
      <SearchDropdown
        name="userID"
        endpoint={`/auth/users/?page_size=5000&role=${role}&exclude_hoa=${hoaId}`}
        label="Użytkownicy"
        getOptions={getUserOptions}
        multiselect={false}
        value={userData.map((user: User) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name} [${user.email}]`,
        }))}
      />
      <ErrorMessage name="userID" component="div" className={styles.error} />
    </FormikWrapper>
  );
};
