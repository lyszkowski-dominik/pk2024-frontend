import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { logOut } from '../../../loginForm/loginFormSlice';
import { useGetUserDataQuery } from '../../../userProfile/userDataApiSlice';
import { Link } from 'react-router-dom';
import styles from './Menu.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { MenuItem, Select } from '@mui/material';

const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { data: detailedData } = useGetUserDataQuery();
  const communityId = useAppSelector(selectSelectedCommunity);

  const handleLogout = () => {
    dispatch(logOut());
    window.location.assign('/login');
  };

  return (
    <Select
      sx={{ height: '50px' }}
      value=""
      onChange={(event) => {
        const value = event.target.value;
        if (value === 'logout') {
          handleLogout();
        }
      }}
      displayEmpty
    >
      <MenuItem value="" sx={{ display: 'none' }}>
        <div className={styles.menuItem}>
          <AccountCircleIcon />
          {detailedData?.first_name} {detailedData?.last_name}
        </div>
      </MenuItem>
      <MenuItem value="profile">
        <Link to={`/user-profile`}>Mój profil</Link>
      </MenuItem>
      <MenuItem value="logout">Wyloguj</MenuItem>
    </Select>
  );
};

export default UserMenu;
