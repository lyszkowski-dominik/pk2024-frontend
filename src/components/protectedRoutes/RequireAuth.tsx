import { Navigate } from 'react-router-dom';
import { selectLogInStatus } from '../loginForm/loginFormSlice';
import { useAppSelector } from '../../app/hooks';

/**
 * 
 * @param {JSX.Element} children - The `RequireAuth` component returns a `Navigate` component if the user is not logged in.
 * @returns {JSX.Element} The `RequireAuth` component returns a `Navigate` component if the user is not logged in.
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RequireAuth;
