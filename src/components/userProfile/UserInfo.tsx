import styles from './UserInfo.module.scss';
import UserDataTable from './UserDataTable';

const UserInfo = () => {

  return (
    <div className={styles.mainContent}>
      <h1>Mój profil</h1>
      <UserDataTable />
    </div>
  );
};

export default UserInfo;