import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  ElementType,
  type BTRef,
  type EventConsumer,
} from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useMask } from './shared/useMask';
import { useCleanupStateBeforeUnmount } from './shared/useCleanStateOnUnmount';

type UseCardVerificationCodeElementProps = {
  btRef?: ForwardedRef<BTRef>;
  cvcLength?: number;
  onChange?: EventConsumer;
};

export const useCardVerificationCodeElement = ({
  btRef,
  cvcLength = 3,
  onChange,
}: UseCardVerificationCodeElementProps) => {
  const id = useId();

  const type = ElementType.CVC;

  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useCleanupStateBeforeUnmount(id);

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
      validatorOptions: { mask },
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
