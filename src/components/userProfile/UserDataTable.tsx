import { useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import styles from './UserDataTable.module.scss';
import { useNavigate } from 'react-router';
import { selectLogInStatus } from '../loginForm/loginFormSlice';
import { useGetUserDataQuery } from './userDataApiSlice';
import { Button, TextField } from '@mui/material';
import { EditUserData } from './changeUserData';

/**
 *
 * @returns {JSX.Element} The `UserDataTable` component returns the user data.
 */

const UserDataTable = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const navigate = useNavigate();
  const { data: detailedData,isError, isLoading, isSuccess } = useGetUserDataQuery();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const userId = detailedData?.id;
  const [isEditError , setIsEditError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleEdit = async (newName: string, newSurname: string) => {
    setIsEditing(false);
    const res = await EditUserData(userId!,{ first_name: newName, last_name: newSurname });
    console.log(res);
    if(res.status !== 200){
      setFirstName(initialFirstName);
      setLastName(initialLastName);
      setIsEditError(true);
      setErrorMsg(res.data.detail);
    }
  };

  const [initialFirstName, setInitialFirstName] = useState<string>('');
  const [initialLastName, setInitialLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isLoggedIn]);

  useEffect(() => {
    if (detailedData) {
      setFirstName(detailedData.first_name);
      setInitialFirstName(detailedData.first_name);
      setLastName(detailedData.last_name);
      setInitialLastName(detailedData.last_name);
    }
  }, [detailedData]);

  return (
    <div className={styles.info}>
      <h2>Informacje o użytkowniku</h2>
      {isLoading && <div>Ładowanie danych...</div>}
      {isError && <div>Wystąpił błąd podczas ładowania danych</div>}
      {isSuccess && !detailedData && <div>Brak danych</div>}
      {detailedData && (
        <table>
          <tbody>
          <tr>
            <td>Imię</td>
            <td>
              {isEditing ? (
                <TextField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                firstName
              )}
            </td>
          </tr>
          <tr>
            <td>Nazwisko</td>
            <td>
              {isEditing ? (
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                lastName
              )}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{detailedData.email}</td>
          </tr>
          </tbody>
        </table>
      )}
      {!isEditing &&
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>Edytuj dane</Button>}
      {isEditing && <Button variant="contained" color="primary" onClick={() => handleEdit(firstName, lastName)}>Zapisz
        zmiany</Button>}
      {isEditError && <div className={styles.errorMsg}>{errorMsg}</div>}
    </div>
  );
};

export default UserDataTable;