import styles from "./Menu.module.scss"
import { Link } from "react-router-dom"
import { selectLogInStatus, logOut } from "../loginForm/loginFormSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

const Menu = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus)
  const [logout, setLogout] = useState(false)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  useEffect(() => {
    if (logout) {
      dispatch(logOut())
      setLogout(false)
      navigate("/login", { replace: true })
    }
  }, [navigate, logout, dispatch])

  return (

    <div className={styles.container}>
      <div className={styles.logo_icon}><img src="../../../icons/house-icon.svg" alt="house icon" /></div>
      <div className={styles.menu}>
        {isLoggedIn && (
          <>
            <Link to={"/"}>Start</Link>
            <Link to={"/user-profile"}>Mój profil</Link>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={() => setLogout(true)}>Wyloguj</a></>
        )}
        {!isLoggedIn && (
          <>
            <Link to={"/"}>Start</Link>
            <Link to={"/login"}>Zaloguj</Link>
            <Link to={"/register"}>Zarejestruj się</Link>
          </>
        )}

      </div>
    </div>
  )
}

export default Menu
