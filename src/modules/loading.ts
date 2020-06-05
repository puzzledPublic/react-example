const START_LOADING = 'loading/START_LOADING' as const;
const FINISH_LOADING = 'loading/FINISH_LOADING' as const;

interface StartLoadingAction {
  type: typeof START_LOADING;
  payload: { requestType: string };
}

interface FinishLoadingAction {
  type: typeof FINISH_LOADING;
  payload: { requestType: string };
}

type LoadingActions = StartLoadingAction | FinishLoadingAction;

export function startLoading(requestType: string): StartLoadingAction {
  return {
    type: START_LOADING,
    payload: { requestType },
  };
}

export function finishLoading(requestType: string): FinishLoadingAction {
  return {
    type: FINISH_LOADING,
    payload: { requestType },
  };
}

interface LoadingState {
  [key: string]: boolean;
}

const initialState: LoadingState = {};

const loading = (
  state = initialState,
  action: LoadingActions,
): LoadingState => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        [action.payload.requestType]: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        [action.payload.requestType]: false,
      };
    default:
      return state;
  }
};

export default loading;
