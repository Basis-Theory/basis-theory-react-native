import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import type { BTRef, Mask } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount.hooks';
import { useBtRef } from './shared/useBtRef.hooks';

const defaultExpirationDateMask = [/\d/u, /\d/u, '/', /\d/u, /\d/u];

export type UseCardExpirationDateElementProps = {
  btRef?: ForwardedRef<BTRef>;
};

export const useCardExpirationDateElement = ({
  btRef,
}: UseCardExpirationDateElementProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  const [mask, setMask] = useState<Mask>(defaultExpirationDateMask);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useEffect(() => {
    setMask(defaultExpirationDateMask);
  }, [textInputValue]);

  useBtRef({ btRef, textInputRef, id, setTextInputValue });

  return {
    textInputRef,
    id,
    setTextInputValue,
    textInputValue,
    mask,
  };
};
