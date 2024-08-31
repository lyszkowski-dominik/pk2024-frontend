import React, { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router';
import { logOut } from '../../loginForm/loginFormSlice';
import { useGetUserDataQuery } from '../../userProfile/userDataApiSlice';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: detailedData,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserDataQuery();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles['menu-button']}
      >
        <AccountCircleIcon />
        {detailedData?.first_name} {detailedData?.last_name}
        <ExpandMoreIcon />
      </button>
      {isOpen && (
        <div className={styles['menu-dropdown']}>
          <ul className={styles['dropdown-list']}>
            <li>
              <Link to={'/user-profile'} >
                Mój profil
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className={styles['menu-button']}>
                Wyloguj
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
