import styles from "./UserProfile.module.scss"
import { selectLogInStatus } from "../components/loginForm/loginFormSlice"
import { useAppSelector } from "../app/hooks"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import UserInfo from "../components/userProfile/UserInfo"
import SideBar from "../components/userProfile/SideBar"

const UserProfile = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectLogInStatus)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true })
    }
  }, [navigate, isLoggedIn])

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <SideBar />
        <UserInfo />
      </div>
    </div>
  )
}

export default UserProfile