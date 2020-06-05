import { put, call } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type: string, request: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action: ReturnType<typeof request>) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      console.log(response);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: FAILURE,
        payload: { error },
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
