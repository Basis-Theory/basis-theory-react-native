import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  ElementType,
  type BTDateRef,
  type BTRef,
  type EventConsumers,
} from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useCleanupStateBeforeUnmount } from './shared/useCleanStateOnUnmount';

type UseCardExpirationDateElementProps = {
  btRef?: ForwardedRef<BTDateRef | BTRef>;
} & EventConsumers;

const useCardExpirationDateElement = ({
  btRef,
  onBlur,
  onChange,
  onFocus,
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

  const { _onChange, _onBlur, _onFocus } = useUserEventHandlers({
    setElementValue,
    element: {
      id,
      validatorOptions: { mask },
      type,
    },
    onChange,
    onBlur,
    onFocus,
  });

  return {
    _onBlur,
    _onChange,
    _onFocus,
    elementRef,
    elementValue,
    mask,
  };
};

export { useCardExpirationDateElement, type UseCardExpirationDateElementProps };
