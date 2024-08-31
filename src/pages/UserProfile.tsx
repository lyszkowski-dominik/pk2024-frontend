import styles from './UserProfile.module.scss';
import { selectLogInStatus } from '../components/loginForm/loginFormSlice';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import UserInfo from '../components/userProfile/UserInfo';
import { Module } from '../types/userProfileTypes';
import UserSettings from '../components/userSettings/UserSettings';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { useSidebar } from '../components/layout/sidebar/SidebarProvider';
import { useGetUserDataQuery } from '../components/userProfile/userDataApiSlice';
import MainLayout from '../components/layout/mainLayout/MainLayout';

const UserProfile = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const [moduleLoaded, setModuleLoaded] = useState<Module>(Module.UserInfo);

  const { isError: isRefreshError, error: refreshError } = useRefreshToken();
  const { data: userData, isLoading, isSuccess } = useGetUserDataQuery();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isLoggedIn]);

  const { setElements } = useSidebar();

  useEffect(() => {
    setElements([
      { title: 'Moje dane', onClick: () => setModuleLoaded(Module.UserInfo) },
      { title: 'Historia zamówień' },
      {
        title: 'Ustawienia',
        onClick: () => setModuleLoaded(Module.UserSettings),
      },
    ]);

    return () => setElements([]);
  }, [setElements]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {moduleLoaded === Module.UserInfo && <UserInfo />}
        {moduleLoaded === Module.UserSettings && <UserSettings />}
        {isRefreshError && <div>{refreshError?.message}</div>}
      </div>
    </div>
  );
};

export default UserProfile;
