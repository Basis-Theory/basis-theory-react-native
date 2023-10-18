import type { ForwardedRef } from 'react';
import { useMemo, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ElementType, type BTRef } from '../BaseElementTypes';
import { useBtRef } from './shared/useBtRef';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { EventConsumer } from './shared/useElementEvent';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';

export type UseCardNumberElementProps = {
  btRef?: ForwardedRef<BTRef>;
  onChange?: EventConsumer;
};

export const useCardNumberElement = ({
  btRef,
  onChange,
}: UseCardNumberElementProps) => {
  const type = ElementType.CARD_NUMBER;

  const textInputRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  const id = useMemo(() => uuid.v4().toString(), []);

  useBtRefUnmount({ btRef });

  const mask = useMask({ type, id });

  useBtRef({ btRef, textInputRef, id, setTextInputValue: setElementValue });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    element: { id, mask, type },
    onChange: onChange,
  });

  return {
    textInputRef,
    textInputValue: elementValue,
    _onChange,
    mask,
  };
};
