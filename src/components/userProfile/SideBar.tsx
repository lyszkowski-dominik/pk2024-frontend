import type React from 'react';
import styles from './SideBar.module.scss';
import { useGetUserDataQuery } from './userDataApiSlice';
import { Module } from '../../types/userProfileTypes';


type SideBarProps = {
  setModule: React.Dispatch<React.SetStateAction<Module>>
}

const SideBar = ({ setModule }: SideBarProps) => {
  const { data: userData, isError, isLoading, isSuccess } = useGetUserDataQuery();
  return (
    <div className={styles.sideBar}>
      <h3>Zalogowano jako {userData?.first_name} {userData?.last_name}</h3>
      <h2>Menu</h2>
      <ul>
        <li onClick={() => {
          setModule(Module.UserInfo);
        }}>Moje dane
        </li>
        <li>Historia zamówień</li>
        <li onClick={() => {
          setModule(Module.UserSettings);
        }}>Ustawienia
        </li>
      </ul>
    </div>
  );
};

export default SideBar;