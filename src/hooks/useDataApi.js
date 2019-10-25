import { useState, useEffect } from 'react';

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};

// TODO: put this out of this hook.
const compareState = (state1, state2) => {
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

export const useDataApi = (request) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      if (compareState(initialState, state)) {
        setState(initialState);
      }
      try {
        const result = await request();
        if (!didCancel) {
          setState((currentState) => ({
            ...currentState,
            data: result.data,
            isLoading: false,
          }));
        }
      } catch (error) {
        if (!didCancel) {
          setState((currentState) => ({
            ...currentState,
            isError: true,
            isLoading: false,
          }));
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
