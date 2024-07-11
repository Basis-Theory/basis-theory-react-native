import { useEffect } from 'react';
import { _elementErrors, _elementValues } from '../../ElementValues';

export const useCleanupStateBeforeUnmount = (id: string) => {
  useEffect(() => {
    // cleans up state when component is unmounted
    return () => {
      delete _elementValues[id];
      delete _elementErrors[id];
    };
  }, []);
};
