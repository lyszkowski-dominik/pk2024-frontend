import styles from './UserSettings.module.scss';
import Modal from '../ui/modal/Modal';
import { useState } from 'react';
import PasswordChangeForm from '../passwordChangeForm/PasswordChangeForm';
import { Button } from '@mui/material';

/**
 * 
 * @returns {JSX.Element} The `UserSettings` component returns the user settings.
 */
const UserSettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);

  return (
    <>
      {isChangingPassword && (
        <Modal>
          <PasswordChangeForm isModalOn={setIsChangingPassword} />
        </Modal>
      )}
      <div className={styles.mainContent}>
        <h1>Ustawienia konta</h1>
        <ul>
          <Button variant="contained" color="primary"  onClick={() => {
            setIsChangingPassword(true);
          }}>
            Zmiana hasła
          </Button>
        </ul>
      </div>
    </>
  );
};

export default UserSettings;
