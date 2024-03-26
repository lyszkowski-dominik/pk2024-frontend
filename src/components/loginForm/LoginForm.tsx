import { useState } from "react"
import { Button, CircularProgress } from "@mui/material"
import styles from "./LoginForm.module.scss"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isFetching, setIsFetching] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsFetching(true)
    console.log("doing something")
    setIsFetching(false)
  }

  const handleGetToken = () => {
    console.log("getting token")
  }

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
