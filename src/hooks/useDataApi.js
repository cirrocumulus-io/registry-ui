import { useReducer, useEffect } from 'react';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};

export const useDataApi = (request) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      if (isEqualState(!initialState, state)) {
        dispatch({ type: FETCH_INIT });
      }
      try {
        const result = await request();
        if (!didCancel) {
          dispatch({ type: FETCH_SUCCESS, payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: FETCH_FAILURE });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [request]);

  return state;
};

const isEqualState = (state1, state2) => {
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

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
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
