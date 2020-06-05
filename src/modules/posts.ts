import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { PostType } from './post';

//액션
const LIST_POSTS = 'posts/LIST_POST' as const;
const LIST_POSTS_SUCCESS = 'posts/LIST_POST_SUCCESS' as const;
const LIST_POSTS_FAILURE = 'posts/LIST_POST_FAILURE' as const;

//액션 생성자
interface ListPostsAction {
  type: typeof LIST_POSTS;
  payload: ListPostsParam;
}

interface ListPostsSuccessAction {
  type: typeof LIST_POSTS_SUCCESS;
  payload: Array<PostType>;
  meta: AxiosResponse;
}

interface ListPostsFailureAction {
  type: typeof LIST_POSTS_FAILURE;
  payload: { error: AxiosError | null };
}

type PostsActions =
  | ListPostsAction
  | ListPostsSuccessAction
  | ListPostsFailureAction;

interface ListPostsParam {
  tag: string;
  username: string;
  page: number;
}

export function listPosts({
  tag,
  username,
  page,
}: ListPostsParam): ListPostsAction {
  return {
    type: LIST_POSTS,
    payload: { tag, username, page },
  };
}

//비동기 saga
const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPost);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

//초기상태

interface ListPostsState {
  posts: Array<PostType> | null;
  error: AxiosError | null;
  lastPage: number;
}
const initialState: ListPostsState = {
  posts: null,
  error: null,
  lastPage: 1,
};

//리덕스
const posts = (state = initialState, action: PostsActions): ListPostsState => {
  switch (action.type) {
    case LIST_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: null,
        lastPage: parseInt(action.meta.headers['last-page'], 10),
      };
    case LIST_POSTS_FAILURE:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default posts;
