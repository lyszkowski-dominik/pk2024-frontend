import styles from "./UserInfo.module.scss"
import { useAppSelector } from "../../app/hooks"
import { selectUserData } from "../loginForm/loginFormSlice"

const UserInfo = () => {
  const userData = useAppSelector(selectUserData)

  return (
    <div className={styles.mainContent}>
      <h1>Mój profil</h1>
      <div className={styles.info}>
        <h2>Informacje o użytkowniku</h2>
        <table>
          <tbody>
          <tr>
            <td>Identyfikator użytkownika</td>
            <td>{userData ? userData.id : "Brak danych"}</td>
          </tr>
          <tr>
            <td>Imię</td>
            <td>{userData ? userData.name : "Brak danych"}</td>
          </tr>
          <tr>
            <td>Nazwisko</td>
            <td>{userData ? userData.surname : "Brak danych"}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>@</td>
          </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default UserInfo