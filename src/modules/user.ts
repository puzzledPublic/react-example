import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest, call } from 'redux-saga/effects';

//액션 타입
const TEMP_SET_USER = 'user/TEMP_SET_USER' as const;

const CHECK = 'user/CHECK' as const;
const CHECK_SUCCESS = 'user/CHECK_SUCCESS' as const;
const CHECK_FAILURE = 'user/CHECK_FAILURE' as const;

const LOGOUT = 'user/LOGOUT' as const;

export interface UserInfo {
  _id: string;
  username: string;
}

interface TempSetUserAction {
  type: typeof TEMP_SET_USER;
  payload: UserInfo;
}

interface CheckAction {
  type: typeof CHECK;
  payload: null;
}

interface CheckSuccessAction {
  type: typeof CHECK_SUCCESS;
  payload: UserInfo;
}

interface CheckFailureAction {
  type: typeof CHECK_FAILURE;
  payload: { error: Error | null };
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: null;
}

type UserActions =
  | TempSetUserAction
  | CheckSuccessAction
  | CheckFailureAction
  | CheckAction
  | LogoutAction;

//액션 생성 함수
export function tempSetUser(user: UserInfo): TempSetUserAction {
  return {
    type: TEMP_SET_USER,
    payload: user,
  };
}

export function check(): CheckAction {
  return {
    type: CHECK,
    payload: null,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
    payload: null,
  };
}

//비동기 액션 생성
const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

//초기 상태
interface UserStateType {
  user: UserInfo | null;
  checkError: Error | null;
}

const initialState: UserStateType = {
  user: null,
  checkError: null,
};

//리듀서
const user = (state = initialState, action: UserActions): UserStateType => {
  switch (action.type) {
    case TEMP_SET_USER:
      return { ...state, user: action.payload };
    case CHECK_SUCCESS:
      return { ...state, user: action.payload, checkError: null };
    case CHECK_FAILURE:
      return { ...state, user: null, checkError: action.payload.error };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default user;
