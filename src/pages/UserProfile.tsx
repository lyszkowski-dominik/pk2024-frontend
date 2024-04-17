import styles from './UserProfile.module.scss'
import { selectLogInStatus } from '../components/loginForm/loginFormSlice'
import { useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react';
import UserInfo from '../components/userProfile/UserInfo'
import SideBar from '../components/userProfile/SideBar'
import { Module } from '../types/userProfileTypes'
import UserSettings from '../components/userSettings/UserSettings';


const UserProfile = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectLogInStatus)
  const [moduleLoaded, setModuleLoaded] = useState<Module>(Module.UserInfo)


  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [navigate, isLoggedIn])

  return (<div className={styles.container}>

    <div className={styles.content}>
      <SideBar setModule={setModuleLoaded}/>
      {moduleLoaded === Module.UserInfo && <UserInfo />}
      {moduleLoaded === Module.UserSettings && <UserSettings />}
    </div>
  </div>)
}

export default UserProfile