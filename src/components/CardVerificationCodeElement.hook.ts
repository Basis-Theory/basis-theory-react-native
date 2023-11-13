import type { ForwardedRef } from 'react';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ElementType, type BTRef } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import type { EventConsumer } from './shared/useElementEvent';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useMask } from './shared/useMask';

type UseCardVerificationCodeElementProps = {
  btRef?: ForwardedRef<BTRef>;
  cvcLength?: number;
  onChange?: EventConsumer;
};

const id = uuid.v4().toString();

export const useCardVerificationCodeElement = ({
  btRef,
  cvcLength = 3,
  onChange,
}: UseCardVerificationCodeElementProps) => {
  const type = ElementType.CVC;

  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  const mask = useMask({
    maskLength: cvcLength,
    type,
  });

  useBtRef({
    btRef,
    elementRef,
    id,
    setElementValue,
  });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    element: {
      id,
      mask,
      type,
    },
    onChange,
  });

  return {
    elementRef,
    elementValue,
    mask,
    _onChange,
  };
};

export type { UseCardVerificationCodeElementProps };
