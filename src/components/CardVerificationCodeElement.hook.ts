import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  ElementType,
  type BTRef,
  type EventConsumers,
} from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useMask } from './shared/useMask';
import { useCleanupStateBeforeUnmount } from './shared/useCleanStateOnUnmount';

type UseCardVerificationCodeElementProps = {
  btRef?: ForwardedRef<BTRef>;
  cvcLength?: number;
} & EventConsumers;

export const useCardVerificationCodeElement = ({
  btRef,
  cvcLength = 3,
  onBlur,
  onChange,
  onFocus,
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

  const { _onChange, _onBlur, _onFocus } = useUserEventHandlers({
    setElementValue,
    element: {
      id,
      validatorOptions: { mask },
      type,
    },
    onBlur,
    onChange,
    onFocus,
  });

  return {
    elementRef,
    elementValue,
    mask,
    _onChange,
    _onBlur,
    _onFocus,
  };
};

export type { UseCardVerificationCodeElementProps };
