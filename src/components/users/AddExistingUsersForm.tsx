import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import AddExistingUser from '../../features/users/AddExistingUser';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import styles from './ExistingUsers.module.scss';
import { Button } from '@mui/material';
import SearchDropdown, { type SearchDropdownOption } from '../ui/search/SearchDropdown';
import type { User } from '../../features/users/usersTypes';

export const AddExistingUsersForm = ({
                                       isModalOn,
                                       refreshList,
                                       role
                                     }: {
  isModalOn: (value: boolean) => void;
  refreshList: () => void;
  role: string;
}) => {
  const [userData] = useState<any[]>([]);
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ errors: string } | null>(
    null,
  );


  const getUserOptions = (data: any): SearchDropdownOption[] => {
    return data.results?.map((owner: User) => ({
      value: owner.id,
      label: `${owner.first_name} ${owner.last_name} [${owner.email}]`,
      key: owner.id
    }));
  };

  return (
    <Formik
      initialValues={{ userID: '' }}
      onSubmit={(values) => {
        const userID = values.userID;
        AddExistingUser({ role, hoaID, userID }).then((res) => {
          if (res.id) {
            refreshList();
            isModalOn(false);
          }else{
            setErrorMessages(res);
            setIsError(true);
          }
        });
      }}
    >
      {() => (
        <Form>
          <div>
            <h1>Dodawanie istniejącego użytkownika</h1>
            <div>
              <SearchDropdown
                name="userID"
                endpoint={`/auth/users/?page_size=5000&role=${role}&exclude_hoa=${hoaID}`}
                label="Użytkownicy"
                getOptions={getUserOptions}
                multiselect={false}
                value={userData.map((owner: User) => ({
                  value: owner.id,
                  label: `${owner.first_name} ${owner.last_name} [${owner.email}]`
                }))}
              />
            </div>
            {isError && (
              <div className={styles.error}>
                {Object.entries(errorMessages || {}).map(([key, value]) => (
                  <div key={key}>{value}</div>
                ))}
              </div>
            )}
            <div className={styles.buttons}>
              <Button
                variant="contained"
                className={styles.change}
                type="submit"
              >
                Dodaj
              </Button>
              <Button
                color="secondary"
                className={styles.cancel}
                type="reset"
                onClick={() => {
                  isModalOn(false);
                }}
              >
                Anuluj
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};