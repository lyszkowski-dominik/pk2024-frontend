import styles from './UserInfo.module.scss';
import UserDataTable from './UserDataTable';
import UserSettings from '../userSettings/UserSettings';

/**
 *
 * @returns {JSX.Element} The `UserInfo` component returns the user profile.
 */
const UserInfo = () => {


  return (
    <div className={styles.mainContent}>
      <h1>Mój profil</h1>
      <div className={styles.userSettings}>
        <UserDataTable />
      </div>
      <UserSettings />
    </div>
  );
};

export default UserInfo;