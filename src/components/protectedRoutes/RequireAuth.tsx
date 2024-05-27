import { Navigate } from 'react-router-dom';
import { selectLogInStatus } from '../loginForm/loginFormSlice';
import { useAppSelector } from '../../app/hooks';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
