import styles from "./SideBar.module.scss"

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
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