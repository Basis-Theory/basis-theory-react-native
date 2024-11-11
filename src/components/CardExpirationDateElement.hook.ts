import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import type { BTDateRef } from '../BaseElementTypes';
import {
  ElementType,
  type BTRef,
  type EventConsumer,
} from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useCleanupStateBeforeUnmount } from './shared/useCleanStateOnUnmount';

type UseCardExpirationDateElementProps = {
  btRef?: ForwardedRef<BTDateRef | BTRef>;
  onChange?: EventConsumer;
};

const useCardExpirationDateElement = ({
  btRef,
  onChange,
}: UseCardExpirationDateElementProps) => {
  const id = useId();

  const type = ElementType.EXPIRATION_DATE;

  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useCleanupStateBeforeUnmount(id);

  useBtRefUnmount({ btRef });

  const mask = useMask({ type });

  useBtRef({
    btRef,
    elementRef,
    id,
    setElementValue,
    type,
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

export { useCardExpirationDateElement, type UseCardExpirationDateElementProps };
