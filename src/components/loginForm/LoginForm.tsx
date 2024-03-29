import type React from "react"
import { useState } from "react"
import { Button, CircularProgress } from "@mui/material"
import styles from "./LoginForm.module.scss"
import { useGetToken } from "../../hooks/useGetToken"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectLogInStatus, logIn } from "./loginFormSlice"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectLogInStatus)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const { data, refetch, isError, isFetching } = useGetToken({
    username,
    password
  })
  const handleGetToken = async () => {
    await refetch()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(username, password)
    handleGetToken()
  }

  if (data !== undefined) {
    console.log(data)
    dispatch(logIn())
  }
  console.log(isLoggedIn)
  const changePasswordHandler = () => {
    console.log("changing password")
  }

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1>Zaloguj się do systemu</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Użytkownik:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Hasło:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {/*ADD MODAL ERROR WINDOW*/}
          {isError && <p>Wystąpił błąd</p>}
          <Button
            disabled={isFetching}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              handleGetToken()
              // navigate("/home", { replace: true });
            }}
          >
            <span>{isFetching ? <CircularProgress /> : "Zaloguj"}</span>
          </Button>
          <p onClick={changePasswordHandler} className={styles.btn_pw_change}>
            Zmień hasło
          </p>
        </form>
      </div>

    </div>
  )
}

export default LoginForm
