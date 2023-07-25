import { ForwardedRef, useEffect } from 'react';
import { BTRef } from '../../BaseElementTypes';

interface UseBtRefUnmountProps {
  btRef?: ForwardedRef<BTRef>;
}

export const useBtRefUnmount = ({ btRef }: UseBtRefUnmountProps) => {
  useEffect(
    () => () => {
      // this suggests to have btRef as the dep, but we only want to set btRef to
      // null once on unmount
      // eslint-disable-next-line react-hooks/exhaustive-deps, no-param-reassign, unicorn/no-null
      btRef = null;
    },
    []
  );
};
