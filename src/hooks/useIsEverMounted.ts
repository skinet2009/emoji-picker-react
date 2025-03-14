import { useEffect, useState } from 'react';

let isEverMounted = false;

export function useIsEverMounted() {
  const [isMounted, setIsMounted] = useState(isEverMounted);

  useEffect(() => {
    setIsMounted(true);
    isEverMounted = true;
  }, []);

  return isMounted || isEverMounted;
}
