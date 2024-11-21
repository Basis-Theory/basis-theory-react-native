import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  ElementType,
  type BTRef,
  type EventConsumer,
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
  onChange?: EventConsumer;
  transform?: TransformType;
};

export const useTextElement = ({
  btRef,
  mask,
  onChange,
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

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    element: {
      id,
      validatorOptions: { mask },
      type: ElementType.TEXT,
    },
    onChange,
    transform,
  });

  return {
    elementRef,
    _onChange,
    elementValue,
  };
};

export type { UseTextElementProps };
