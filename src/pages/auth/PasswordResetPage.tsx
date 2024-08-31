import { useNavigate } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import AuthLayout from '../../components/layout/authLayout/AuthLayout'
import { selectLogInStatus } from '../../components/loginForm/loginFormSlice';
import { useEffect } from 'react';
import ResetPasswordForm from '../../components/passwordResetEmailForm/PasswordResetEmailForm';

const PasswordResetPage = () => {
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [navigate, isLoggedIn]);
  
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}

export default PasswordResetPage;