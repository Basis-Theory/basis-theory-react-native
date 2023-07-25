import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import type { BTRef, InputBTRef, Mask } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount.hooks';
import { useBtRef } from './shared/useBtRef.hooks';

const defaultCvcMask = [/\d/u, /\d/u, /\d/u, /\d/u];

export type UseCardVerificationCodeElementProps = {
  btRef?: ForwardedRef<BTRef>;
};

export const useCardVerificationCodeElement = ({
  btRef,
}: UseCardVerificationCodeElementProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  const [mask, setMask] = useState<Mask>(defaultCvcMask);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useEffect(() => {
    setMask(defaultCvcMask);
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
