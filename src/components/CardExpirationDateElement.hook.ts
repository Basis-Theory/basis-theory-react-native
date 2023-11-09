import type { ForwardedRef } from 'react';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ElementType, type BTRef, BTDateRef } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { EventConsumer } from './shared/useElementEvent';

export type UseCardExpirationDateElementProps = {
  btRef?: ForwardedRef<BTRef | BTDateRef>;
  onChange?: EventConsumer;
};

const id = uuid.v4().toString();

export const useCardExpirationDateElement = ({
  btRef,
  onChange,
}: UseCardExpirationDateElementProps) => {
  const type = ElementType.EXPIRATION_DATE;

  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

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
    element: { id, mask, type },
    onChange,
  });

  return {
    elementRef,
    elementValue,
    mask,
    _onChange,
  };
};
