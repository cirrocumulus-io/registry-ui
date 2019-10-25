export const FETCH_INIT = 'FETCH_INIT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const isEqualState = (state1, state2) => {
  if (!state1 && !state2) {
    return true;
  }

  // eslint-disable-next-line no-mixed-operators
  if (!state1 && state2 || state1 && !state2) {
    return false;
  }

  return state1.isLoading === state2.isLoading
        && state1.isError === state2.isError
        && !state1.data && !state2.data;
};

export const dataFetchReducer = (state, action) => {
  switch (action.type) {
  case FETCH_INIT:
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  case FETCH_SUCCESS:
    return {
      ...state,
      isLoading: false,
      isError: false,
      data: action.payload,
    };
  case FETCH_FAILURE:
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  default:
    throw new Error();
  }
};
