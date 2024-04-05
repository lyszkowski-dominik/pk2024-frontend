import { useAppSelector } from "../app/hooks"
import { selectUserData } from "../components/loginForm/loginFormSlice"

const HomePage = () => {
  const userData = useAppSelector(selectUserData)
  return (
    <div>
      {!userData && <h1>Witaj w aplikacji E-Wspólnota</h1>}
      {userData && <h1>Witaj {userData.name} {userData.surname}</h1>}
    </div>
  )
}

export default HomePage
