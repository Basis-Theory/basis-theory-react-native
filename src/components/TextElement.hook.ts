import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  ElementType,
  type EventConsumers,
  type BTRef,
  type Mask,
} from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import type { TransformType } from './shared/useTransform';
import { useCleanupStateBeforeUnmount } from './shared/useCleanStateOnUnmount';

type UseTextElementProps = {
  btRef?: ForwardedRef<BTRef>;
  mask?: Mask;
  transform?: TransformType;
} & EventConsumers;

export const useTextElement = ({
  btRef,
  mask,
  onChange,
  onBlur,
  onFocus,
  transform,
}: UseTextElementProps) => {
  const id = useId();

  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useCleanupStateBeforeUnmount(id);

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
      type: ElementType.TEXT,
    },
    onChange,
    onBlur,
    onFocus,
    transform,
  });

  return {
    elementRef,
    _onChange,
    _onBlur,
    _onFocus,
    elementValue,
  };
};

export type { UseTextElementProps };
