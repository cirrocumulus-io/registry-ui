import { useReducer, useEffect } from 'react';
import {
  dataFetchReducer, FETCH_FAILURE, FETCH_INIT, FETCH_SUCCESS,
} from './useDataApiUtil';

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};

export const useDataApi = (request, count) => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });
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
  }, [request, count]);

  return state;
};
