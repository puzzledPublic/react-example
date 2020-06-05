import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  LoginFormType,
  AuthInfo,
  login,
} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { RootState } from '../../modules';
import { check } from '../../modules/user';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const { form, auth, authError, user } = useSelector<
    RootState,
    {
      form: LoginFormType;
      auth: AuthInfo | null;
      authError: Error | null;
      user: any;
    }
  >(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    dispatch(changeField({ form: 'login', key: name, value }));
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }

    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch(error) {
        console.log('localStorage is not working');
      }
    }
  }, [user, history]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default LoginForm;
