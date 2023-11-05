import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
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

const id = uuid.v4().toString();

export const useCardNumberElement = ({
  btRef,
  onChange,
}: UseCardNumberElementProps) => {
  const type = ElementType.CARD_NUMBER;
  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  const mask = useMask({ type, id });

  useBtRef({ btRef, elementRef, id, setElementValue });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    transform: [' ', ''],
    element: { id, mask, type },
    onChange: onChange,
  });

  return {
    elementRef,
    elementValue,
    _onChange,
    mask,
  };
};
