import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import AuthLayout from '../../components/common/layout/authLayout/AuthLayout';
import { selectLogInStatus } from '../../components/loginForm/loginFormSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
/**
 *
 * @returns {React.FunctionComponent} The `PasswordResetEmailSent` component is a functional component that displays a message that the password reset email has been sent.
 */
const PasswordResetEmailSent = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [navigate, isLoggedIn]);

  return (
    <AuthLayout>
      <h1>Hasło zresetowane</h1>
      <hr style={{ width: '350px' }} />
      <p>
        Na podany adres email został wysłany email z linkiem umożliwiającym
        zresetowanie hasła.
        <br />
        Jeśli po 5 minutacch nadal nie otrzymałeś maila z resetem hasła spróbuj
        ponownie.
      </p>
      <p>
        Kliknij tutaj aby wrócić do strony logowania.{' '}
        <Link to="/login">Zaloguj</Link>
      </p>
    </AuthLayout>
  );
};

export default PasswordResetEmailSent;
