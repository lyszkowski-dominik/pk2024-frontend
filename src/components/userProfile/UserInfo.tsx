import styles from "./UserInfo.module.scss"

const UserInfo = () => {
    return (
      <div className={styles.mainContent}>
        <h1>Mój profil</h1>
        <div className={styles.info}>
          <h2>Informacje o użytkowniku</h2>
          <p>Imię: Jan</p>
          <p>Nazwisko: Kowalski</p>
          <p>Email: @
          </p>
        </div>

      </div>
    );
};

export default UserInfo;