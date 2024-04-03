import styles from "./SideBar.module.scss"
import {useAppSelector} from "../../app/hooks"
import { selectUserData } from "../loginForm/loginFormSlice"

const SideBar = () => {
  const userData = useAppSelector(selectUserData)
  return (
    <div className={styles.sideBar}>
      <h3>Zalogowano jako {userData?.name} {userData?.surname}</h3>
      <h2>Menu</h2>
      <ul>
        <li>Moje dane</li>
        <li>Historia zamówień</li>
        <li>Ustawienia</li>
      </ul>
    </div>
  )
}

export default SideBar