import styles from './UserProfile.module.scss';
import { selectLogInStatus } from '../components/loginForm/loginFormSlice';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import UserInfo from '../components/userProfile/UserInfo';
import { Module } from '../features/auth/userProfileTypes';
import UserSettings from '../components/userSettings/UserSettings';
import { useRefreshToken } from '../features/auth/useRefreshToken';
import { useSidebar } from '../components/layout/sidebar/SidebarProvider';
import { useGetUserDataQuery } from '../components/userProfile/userDataApiSlice';
import MainLayout from '../components/layout/mainLayout/MainLayout';

/**
 * The UserProfile component in TypeScript React handles user profile information, navigation, and
 * sidebar elements based on user authentication status and selected module.
 * @returns {JSX.Element} The `UserProfile` component is being returned. It contains conditional rendering based on
 * the `moduleLoaded` state, displaying either the `UserInfo` component or the `UserSettings`
 * component. It also handles navigation based on the user's login status and sets up the sidebar
 * elements accordingly. Additionally, it displays an error message if there is a refresh token error.
 */
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
