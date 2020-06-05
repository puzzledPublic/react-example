import { AxiosError } from 'axios';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

//액션
const READ_POST = 'post/READ_POST' as const;
const READ_POST_SUCCESS = 'post/READ_POST_SUCCESS' as const;
const READ_POST_FAILURE = 'post/READ_POST_FAILURE' as const;

const UNLOAD_POST = 'post/UNLOAD_POST' as const;

//액션 생성기

interface ReadPostAction {
  type: typeof READ_POST;
  payload: string;
}

interface ReadPostSuccessAction {
  type: typeof READ_POST_SUCCESS;
  payload: any;
}

interface ReadPostFailureAction {
  type: typeof READ_POST_FAILURE;
  payload: { error: AxiosError | null };
}

interface UnloadPostAction {
  type: typeof UNLOAD_POST;
  payload: null;
}

type PostActions =
  | ReadPostAction
  | ReadPostSuccessAction
  | ReadPostFailureAction
  | UnloadPostAction;

export function readPost(id: string): ReadPostAction {
  return {
    type: READ_POST,
    payload: id,
  };
}

export function unloadPost(): UnloadPostAction {
  return {
    type: UNLOAD_POST,
    payload: null,
  };
}

//비동기 saga
const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
}

//초기 상태

export interface PostType {
  title: string;
  body: string;
  user: {
    _id: string;
    username: string;
  };
  tags: Array<string>;
  publishedDate: Date;
  _id: string;
}

interface ReadPostState {
  post: PostType | null;
  error: AxiosError | null;
}

const initialState: ReadPostState = {
  post: null,
  error: null,
};

//리듀서
const post = (state = initialState, action: PostActions): ReadPostState => {
  switch (action.type) {
    case READ_POST_SUCCESS:
      return { ...state, post: action.payload };
    case READ_POST_FAILURE:
      return { ...state, error: action.payload.error };
    case UNLOAD_POST:
      return initialState;
    default:
      return state;
  }
};

export default post;
