import styles from './UserSettings.module.scss';
import Modal from '../ui/modal/Modal';
import { useState } from 'react';
import PasswordChangeForm from '../passwordChangeForm/PasswordChangeForm';

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
          <li
            onClick={() => {
              setIsChangingPassword(true);
            }}
          >
            Zmiana hasła
          </li>
          <li>Ustawienia powiadomień</li>
          <li>Ustawienia prywatności</li>
        </ul>
      </div>
    </>
  );
};

export default UserSettings;
