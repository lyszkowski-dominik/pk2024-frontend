import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import AuthLayout from '../../components/common/layout/authLayout/AuthLayout';
import LoginForm from '../../components/loginForm/LoginForm';
import { selectLogInStatus } from '../../components/loginForm/loginFormSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/ui/icon/Icon';
/**
 *
 * @returns {React.FunctionComponent} The `LoginPage` component is a functional component that displays the login page.
 */
const LoginPage = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <AuthLayout>
      <Icon name="logo" size={250}></Icon>
      <hr style={{ width: '350px' }} />
      <h1>Zaloguj się do systemu</h1>
      <LoginForm />
      <div>
        Zapomniałeś hasła? <Link to="/reset-password">Kliknij tutaj</Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
