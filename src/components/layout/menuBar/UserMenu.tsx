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
    navigate('/login', { replace: true });
    setIsOpen(false);
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
    <div style={{ position: 'relative' }} ref={menuRef}>
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
              <Link to={`/hoa/${communityId}/user-profile`} onClick={handleMenuItemClick}>
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