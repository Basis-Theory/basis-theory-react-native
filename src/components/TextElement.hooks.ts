import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import type { BTRef, Mask } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount.hooks';
import { useBtRef } from './shared/useBtRef.hooks';

export type UseTextElementProps = {
  btRef?: ForwardedRef<BTRef>;
  mask?: Mask;
};

export const useTextElement = ({ btRef, ...props }: UseTextElementProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  const [mask, setMask] = useState<Mask | undefined>(undefined);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useEffect(() => {
    setMask(props.mask);
  }, [textInputValue, props.mask]);

  useBtRef({ btRef, textInputRef, id, setTextInputValue });

  return {
    textInputRef,
    id,
    setTextInputValue,
    textInputValue,
    mask,
  };
};
