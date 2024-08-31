import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import AuthLayout from '../../components/layout/authLayout/AuthLayout'
import { selectLogInStatus } from '../../components/loginForm/loginFormSlice';
import { useEffect } from 'react';
import PasswordResetForm from '../../components/passwordResetForm/PasswordResetForm';

const PasswordResetConfirmPage = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [navigate, isLoggedIn]);
  
  return (
    <AuthLayout>
      <PasswordResetForm isModalOn={() => false}/>
    </AuthLayout>
  );
}

export default PasswordResetConfirmPage;