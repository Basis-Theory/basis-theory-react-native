import type { ForwardedRef } from 'react';
import { useEffect } from 'react';
import type { BTRef } from '../../BaseElementTypes';

type UseBtRefUnmountProps = {
  btRef?: ForwardedRef<BTRef>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useBtRefUnmount = ({ btRef }: UseBtRefUnmountProps) => {
  useEffect(
    () => () => {
      // this suggests to have btRef as the dep, but we only want to set btRef to
      // null once on unmount
      // eslint-disable-next-line no-param-reassign,
      btRef = null;
    },
    []
  );
};
