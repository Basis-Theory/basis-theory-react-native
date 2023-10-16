import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import type { BTRef, Mask } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount.hooks';
import { useBtRef } from './shared/useBtRef.hooks';

const defaultCvcMask = [/\d/u, /\d/u, /\d/u, /\d/u];

const createMask = (length: number): Mask =>
  Array.from<string | RegExp>({ length }).fill(/\d/u);

const isCVCOutOfRange = (cvcLength: number) => cvcLength > 4 || cvcLength < 3;

export type UseCardVerificationCodeElementProps = {
  btRef?: ForwardedRef<BTRef>;
  cvcLength?: number;
};

export const useCardVerificationCodeElement = ({
  btRef,
  cvcLength = 3,
}: UseCardVerificationCodeElementProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  const [mask, setMask] = useState<Mask>(defaultCvcMask);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useEffect(() => {
    const length = isCVCOutOfRange(cvcLength) ? 4 : cvcLength;
    const mask = createMask(length);

    setMask(mask);
  }, [textInputValue, cvcLength]);

  useBtRef({ btRef, textInputRef, id, setTextInputValue });

  return {
    textInputRef,
    id,
    setTextInputValue,
    textInputValue,
    mask,
  };
};
