import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getCurrentUserData, selectCurrentUserData, selectStatus } from "./userProfileSlice"
import { useEffect } from "react"
import styles from "./UserDataTable.module.scss"
import { useNavigate } from "react-router"
import { selectLogInStatus } from "../loginForm/loginFormSlice"

const UserDataTable = () => {
  const detailedData = useAppSelector(selectCurrentUserData)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectLogInStatus)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true })
    }
  }, [navigate, isLoggedIn])

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getCurrentUserData(null))
    }
  }, [dispatch, isLoggedIn])

  return <div className={styles.info}>
    <h2>Informacje o użytkowniku</h2>
    {status === "loading" && <div>Ładowanie danych...</div>}
    {status === "failed" && <div>Wystąpił błąd podczas ładowania danych</div>}
    {status === "idle" && !detailedData && <div>Brak danych</div>}
    {status === "idle" && detailedData && (
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