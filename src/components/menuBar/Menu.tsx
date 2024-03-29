import styles from "./Menu.module.scss"
import { Link } from "react-router-dom"
import { selectLogInStatus, logOut } from "../loginForm/loginFormSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Button } from "@mui/material"
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
  }, [navigate,logout, dispatch])

  return (

    <div className={styles.container}>
      <div className={styles.logo}>
        Logo
      </div>
      <div className={styles.menu}>
        {isLoggedIn && (
          <>
            <Link to={"/"}>Home</Link>
            <Button onClick={() => setLogout(true)}>Log out</Button></>
        )}
        {!isLoggedIn && (
          <>
            <Link to={"/"}>Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}

      </div>
    </div>
  )
}

export default Menu
