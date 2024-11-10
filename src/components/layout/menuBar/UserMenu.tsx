import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router';
import { logOut } from '../../loginForm/loginFormSlice';
import { useGetUserDataQuery } from '../../userProfile/userDataApiSlice';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { Select, MenuItem } from '@mui/material';

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
  const menuRef = useRef<HTMLDivElement>(null);
  const communityId = useAppSelector(selectSelectedCommunity);

  const handleLogout = () => {
    dispatch(logOut());
    setIsOpen(false);
    window.location.assign('/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Select
      sx={{height: '50px'}}
      value=""
      onChange={(event) => {
        const value = event.target.value;
        if (value === 'profile') {
          handleMenuItemClick();
        } else if (value === 'logout') {
          handleLogout();
        }
      }}
      displayEmpty
    >
      <MenuItem value="" sx={{display:'none'}}>
        <div className={styles.menuItem}>
          <AccountCircleIcon />
          {detailedData?.first_name} {detailedData?.last_name}
        </div>
      </MenuItem>
      <MenuItem value="profile">
        <Link to={`/hoa/${communityId}/user-profile`} onClick={handleMenuItemClick}>
          Mój profil
        </Link>
      </MenuItem>
      <MenuItem value="logout">
        Wyloguj
      </MenuItem>
    </Select>
  );
};

export default UserMenu;