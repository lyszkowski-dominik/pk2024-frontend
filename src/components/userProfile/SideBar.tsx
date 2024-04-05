import styles from "./SideBar.module.scss"
import { useGetUserDataQuery } from "./userDataApiSlice"


const SideBar = () => {
  const { data: userData, isError, isLoading, isSuccess } = useGetUserDataQuery()
  return (
    <div className={styles.sideBar}>
      <h3>Zalogowano jako {userData?.first_name} {userData?.last_name}</h3>
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