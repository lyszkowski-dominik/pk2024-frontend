import { useAppSelector } from "../../app/hooks"
import { useEffect } from "react"
import styles from "./UserDataTable.module.scss"
import { useNavigate } from "react-router"
import { selectLogInStatus } from "../loginForm/loginFormSlice"
import { useGetUserDataQuery } from "./userDataApiSlice"

const UserDataTable = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus)
  const navigate = useNavigate()
  const { data: detailedData, isError, isLoading, isSuccess } = useGetUserDataQuery()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true })
    }
  }, [navigate, isLoggedIn])


  return <div className={styles.info}>
    <h2>Informacje o użytkowniku</h2>
    {isLoading && <div>Ładowanie danych...</div>}
    {isError && <div>Wystąpił błąd podczas ładowania danych</div>}
    {isSuccess && !detailedData && <div>Brak danych</div>}
    {detailedData && (
      <table>
        <tbody>
        <tr>
          <td>Imię</td>
          <td>{detailedData ? detailedData.first_name : "Brak danych"}</td>
        </tr>
        <tr>
          <td>Nazwisko</td>
          <td>{detailedData ? detailedData.last_name : "Brak danych"}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{detailedData ? detailedData.email : "Brak danych"}</td>
        </tr>
        </tbody>
      </table>
    )}
  </div>
}

export default UserDataTable