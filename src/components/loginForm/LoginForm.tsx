import type React from 'react';
import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import styles from './LoginForm.module.scss';
import { useGetToken } from '../../hooks/useGetToken';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLogInStatus, logIn } from './loginFormSlice';
import InputField from '../forms/inputField/InputField';
import SubmitButton from '../forms/submitButton/SubmitButton';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data, refetch, isError, isFetching } = useGetToken({
    username,
    password,
  });
  const handleGetToken = async () => {
    await refetch();
  };

  useEffect(() => {
    if (
      data !== undefined &&
      data.refresh !== undefined &&
      data.access !== undefined
    ) {
      dispatch(logIn(data));
    }
  }, [data, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGetToken();
  };

  //

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          label="E-mail"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={isError}
          disabled={isFetching}
        />
        <InputField
          label="Hasło"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={isError}
          disabled={isFetching}
        />

        {isError && <p>Wystąpił błąd lub nie odnaleziono użytkownika.</p>}
        <SubmitButton
          text="Zaloguj"
          isLoading={isFetching}
          onClick={() => {
            handleGetToken();
          }}
        />
      </form>
    </>
  );
};

export default LoginForm;
