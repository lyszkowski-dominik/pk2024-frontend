import TextInputLiveFeedback from '../common/forms/textInputLiveFeedback/TextInputLiveFeedback';
import * as Yup from 'yup';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import { useCreateUser } from '../../features/users/useCreateUser';
import type { User } from '../../features/users/usersTypes';
import type { UserRole } from '../../types/types';
import FormikWrapper, {
  FormikWrapperProps,
} from '../common/forms/form/FormikWrapper';
import { useState } from 'react';
import { useAddExistingUser } from '../../features/users/useAddExistingUser';

const AddUserForm = ({
  onClose,
  role,
}: {
  onClose: () => void;
  role: UserRole;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const [userData, setUserData] = useState({});
  // const { isLoading, data } = useGetUsers({
  //   page: 1,
  //   pageSize: 50,
  //   role: role,
  //   excludeHoa: hoaId,
  // });

  // const usersDropdownOptions: SearchDropdownOption[] = data
  //   ? data.results?.map((user: User) => ({
  //       value: user.id,
  //       label: `${user.first_name} ${user.last_name} [${user.email}]`,
  //       key: user.id,
  //     }))
  //   : [];

  // useEffect(() => () => resetForm()
  // , [])

  const addUser = useAddExistingUser(hoaId, role);
  const createUser = useCreateUser(hoaId, role);

  const onSubmit = (user: User, setSubmitting: any, setErrors: any) => {
    createUser.mutate(
      { user, role, hoa: hoaId },
      {
        onSuccess: () => {
          onClose();
          addNotification('Użytkownik został dodany.', 'success');
        },
        onError: (error: any) => {
          setErrors(error);
          setSubmitting(false);
        },
      },
    );
  };

  const formikProps: FormikWrapperProps<Partial<User>> = {
    submitLabel: 'Dodaj',
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
    },
    onSubmit: (values, { setSubmitting, setErrors }) =>
      onSubmit(values as User, setSubmitting, setErrors),
    onCancel: onClose,
    validationSchema:
      // !addingNew
      //   ? Yup.object({
      //       id: Yup.number().required('Wybierz użytkownika'),
      //     })
      //   :
      Yup.object({
        email: Yup.string()
          .email('Niepoprawny adres email')
          .required('Email jest wymagany'),
        first_name: Yup.string().required('Imię jest wymagane'),
        last_name: Yup.string().required('Nazwisko jest wymagane'),
      }),
  };

  return (
    <FormikWrapper {...formikProps}>
      {/* {({ values: user, resetForm }) => ( */}
      <>
        {/* <SearchDropdown
            name="id"
            // useGetOptions={useGetUsers}
            //endpoint={`/auth/users/?page_size=5000${role?&role=${role}&exclude_hoa=${hoaId}`}
            // queryParams={{
            //   page: 1,
            //   pageSize: 50,
            //   role: role,
            //   excludeHoa: hoaId,
            // }}
            isLoading={isLoading}
            label="Użytkownicy"
            // getOptions={getUserOptions}
            options={usersDropdownOptions}
            multiselect={false}
            value={[
              {
                value: user.id,
                label: `${user.first_name} ${user.last_name} [${user.email}]`,
              },
            ]}
            disabled={addingNew}
            cleanOnDisabling={true}
          /> */}
        {/* <InputField
            label="Dodaj nowego użytkownika"
            name="addingNew"
            value={addingNew}
            type="checkbox"
            checked={addingNew}
            onChange={() => {
              setAddingNew(!addingNew);
              resetForm();
            }}
          /> */}
        {/* {addingNew && ( */}
        <>
          <TextInputLiveFeedback label="Imię" type="text" name="first_name" />
          <TextInputLiveFeedback
            label="Nazwisko"
            type="text"
            name="last_name"
          />
          <TextInputLiveFeedback label="Email" type="email" name="email" />
        </>
        {/* )} */}
      </>
      {/* )} */}
    </FormikWrapper>
  );
};

export default AddUserForm;
