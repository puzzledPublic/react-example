import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { PostType } from './post';

//액션
const INITIALIZE = 'write/INITIALIZE' as const;
const CHANGE_FIELD = 'write/CHANGE_FIELD' as const;

const WRITE_POST = 'write/WRITE_POST' as const;
const WRITE_POST_SUCCESS = 'write/WRITE_POST_SUCCESS' as const;
const WRITE_POST_FAILURE = 'write/WRITE_POST_FAILURE' as const;

const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST' as const;

const UPDATE_POST = 'write/UPDATE_POST' as const;
const UPDATE_POST_SUCCESS = 'write/UPDATE_POST_SUCCESS' as const;
const UPDATE_POST_FAILURE = 'write/UPDATE_POST_FAILURE' as const;

//액션 생성기
export interface ChangeFieldInfo {
  key: string;
  value: string | string[];
}

interface InitializeAction {
  type: typeof INITIALIZE;
  payload: null;
}

interface ChangeFieldAction {
  type: typeof CHANGE_FIELD;
  payload: ChangeFieldInfo;
}

interface WritePostAction {
  type: typeof WRITE_POST;
  payload: PostRequest;
}

interface WritePostSuccessAction {
  type: typeof WRITE_POST_SUCCESS;
  payload: any;
}

interface WritePostFailureAction {
  type: typeof WRITE_POST_FAILURE;
  payload: { error: AxiosError | null };
}

interface SetOriginalPostAction {
  type: typeof SET_ORIGINAL_POST;
  payload: any;
}

interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: PostRequest & { id: string };
}

interface UpdatePostSuccessAction {
  type: typeof UPDATE_POST_SUCCESS;
  payload: any;
}

interface UpdatePostFailureAction {
  type: typeof UPDATE_POST_FAILURE;
  payload: { error: AxiosError | null };
}

type WriteActions =
  | InitializeAction
  | ChangeFieldAction
  | WritePostAction
  | WritePostSuccessAction
  | WritePostFailureAction
  | SetOriginalPostAction
  | UpdatePostAction
  | UpdatePostSuccessAction
  | UpdatePostFailureAction;

export function initialize(): InitializeAction {
  return {
    type: INITIALIZE,
    payload: null,
  };
}

export function changeField({
  key,
  value,
}: ChangeFieldInfo): ChangeFieldAction {
  return {
    type: CHANGE_FIELD,
    payload: { key, value },
  };
}

export function writePost({ title, body, tags }: PostRequest): WritePostAction {
  return {
    type: WRITE_POST,
    payload: { title, body, tags },
  };
}

export function setOriginalPost(post: PostType): SetOriginalPostAction {
  return {
    type: SET_ORIGINAL_POST,
    payload: post,
  };
}

export function updatePost({
  id,
  title,
  body,
  tags,
}: PostRequest & { id: string }): UpdatePostAction {
  return {
    type: UPDATE_POST,
    payload: { id, title, body, tags },
  };
}

//비동기 saga
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

interface PostState {
  title: string;
  body: string;
  tags: Array<string>;
}

interface ReceivedPostState extends PostState {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  publishedDate: Date;
  __v: number;
}

export interface PostRequest extends PostState {}

export interface WritePostState extends PostState {
  post: ReceivedPostState | null;
  postError: AxiosError | null;
  originalPostId: string | null;
}

//초기 상태
const initialState: WritePostState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

//리듀서
const write = (state = initialState, action: WriteActions): WritePostState => {
  switch (action.type) {
    case INITIALIZE:
      return initialState;
    case CHANGE_FIELD:
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    case WRITE_POST:
      return { ...state, post: null, postError: null };
    case WRITE_POST_SUCCESS:
      return { ...state, post: action.payload };
    case WRITE_POST_FAILURE:
      return { ...state, postError: action.payload.error };
    case SET_ORIGINAL_POST:
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        tags: action.payload.tags,
        originalPostId: action.payload._id,
      };
    case UPDATE_POST_SUCCESS:
      return { ...state, post: action.payload };
    case UPDATE_POST_FAILURE:
      return { ...state, postError: action.payload.error };
    default:
      return state;
  }
};

export default write;
