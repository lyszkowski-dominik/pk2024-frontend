import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { logOut } from '../../../loginForm/loginFormSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import UserMenu from './UserMenu';
import CommunityMenu from './CommunityMenu';

/**
 *
 * @returns {JSX.Element} The `Menu` component returns the main menu of the application.
 */
const Menu = () => {
  const [logout, setLogout] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (logout) {
      dispatch(logOut());
      setLogout(false);
      navigate('/login', { replace: true });
    }
  }, [navigate, logout, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Link onClick={() => window.history.back()} to="">
          &lt; Powrót
        </Link>
      </div>
      <div className={styles['right-menu']}>
        <CommunityMenu />
        <UserMenu />
      </div>
    </div>
  );
};

export default Menu;
