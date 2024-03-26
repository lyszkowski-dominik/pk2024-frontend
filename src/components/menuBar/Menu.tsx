import styles from "./Menu.module.scss"
import { Link } from "react-router-dom"

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        Logo
      </div>
      <div className={styles.menu}>
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
      </div>
    </div>
  )
}

export default Menu
