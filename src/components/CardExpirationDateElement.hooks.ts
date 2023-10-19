import type { ForwardedRef } from 'react';
import { useMemo, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ElementType, type BTRef } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { EventConsumer } from './shared/useElementEvent';

export type UseCardExpirationDateElementProps = {
  btRef?: ForwardedRef<BTRef>;
  onChange?: EventConsumer;
};

const id = uuid.v4().toString();

export const useCardExpirationDateElement = ({
  btRef,
  onChange,
}: UseCardExpirationDateElementProps) => {
  const type = ElementType.EXPIRATION_DATE;

  const textInputRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  const mask = useMask({ type });

  useBtRef({
    btRef,
    textInputRef,
    id: id,
    setTextInputValue: setElementValue,
  });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    element: { id, mask, type },
    onChange,
  });

  return {
    textInputRef,
    textInputValue: elementValue,
    mask,
    _onChange,
  };
};
