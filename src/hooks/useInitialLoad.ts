import { Dispatch, SetStateAction, useEffect } from 'react';

export function useMarkInitialLoad(
  dispatch: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    dispatch(true);
  }, [dispatch]);
}
