import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga from '../lib/createRequestSaga';
import { AxiosError } from 'axios';

type AuthFormType = 'register' | 'login';

interface FieldType {
  form: AuthFormType;
  key: string; //username, password, passwordConfirm
  value: string; //실제 바꾸려는 값
}

export interface AuthBaseInput {
  username: string;
  password: string;
}

export interface RegisterFormType {
  username: string;
  password: string;
  passwordConfirm: string;
}

export type LoginFormType = AuthBaseInput;

export interface AuthInfo {
  _id: string;
  username: string;
  __v: number;
}

interface AuthFormStateType {
  register: RegisterFormType;
  login: LoginFormType;
  authError: AxiosError | null;
  auth: AuthInfo | null;
}

//액션 타입.
const CHANGE_FIELD = 'auth/CHANGE_FIELD' as const;
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM' as const;

const REGISTER = 'auth/REGISTER' as const;
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS' as const;
const REGISTER_FAILURE = 'auth/REGISTER_FAILURE' as const;

const LOGIN = 'auth/LOGIN' as const;
const LOGIN_SUCSESS = 'auth/LOGIN_SUCCESS' as const;
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE' as const;

interface ChangeFieldAction {
  type: typeof CHANGE_FIELD;
  payload: FieldType;
}

interface InitializeFormAction {
  type: typeof INITIALIZE_FORM;
  payload: { form: AuthFormType };
}

interface RegisterAction {
  type: typeof REGISTER;
  payload: AuthBaseInput;
}

interface RegisterSucessAction {
  type: typeof REGISTER_SUCCESS;
  payload: AuthInfo;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  payload: {error: AxiosError | null};
}

interface LoginAction {
  type: typeof LOGIN;
  payload: AuthBaseInput;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCSESS;
  payload: AuthInfo;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: {error: AxiosError | null};
}

type AuthActions =
  | ChangeFieldAction
  | InitializeFormAction
  | RegisterAction
  | RegisterSucessAction
  | RegisterFailureAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction;

//액션 생성 함수.
export function changeField({
  form,
  key,
  value,
}: FieldType): ChangeFieldAction {
  return { type: CHANGE_FIELD, payload: { form, key, value } };
}

export function initializeForm(form: AuthFormType): InitializeFormAction {
  return {
    type: INITIALIZE_FORM,
    payload: { form },
  };
}

export function register({
  username,
  password,
}: AuthBaseInput): RegisterAction {
  return {
    type: REGISTER,
    payload: { username, password },
  };
}

export function login({ username, password }: AuthBaseInput): LoginAction {
  return {
    type: LOGIN,
    payload: { username, password },
  };
}

//비동기 액션 생성 함수
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

//초기 상태
const initialState: AuthFormStateType = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },

  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

//리듀서
const auth = (state = initialState, action: AuthActions): AuthFormStateType => {
  switch (action.type) {
    case CHANGE_FIELD:
      const { form, key, value } = action.payload;
      //@ts-ignore
      return {
        ...state,
        [form]: { ...state[form], [key]: value },
      };
    case INITIALIZE_FORM:
      return {
        ...state,
        [action.payload.form]: initialState[action.payload.form],
        authError: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authError: null,
        auth: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        authError: action.payload.error,
      };
    case LOGIN_SUCSESS:
      return {
        ...state,
        authError: null,
        auth: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authError: action.payload.error,
      };
    default:
      return state;
  }
};

export default auth;
