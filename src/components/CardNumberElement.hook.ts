import type { CreditCardType } from '@basis-theory/basis-theory-js/types/elements';
import type { ForwardedRef } from 'react';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import {
  ElementType,
  type BTRef,
  type EventConsumer,
} from '../BaseElementTypes';
import { useBtRef } from './shared/useBtRef';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useCustomBin } from './useCustomBin.hook';

type UseCardNumberElementProps = {
  btRef?: ForwardedRef<BTRef>;
  onChange?: EventConsumer;
  cardTypes?: CreditCardType[];
};

const id = uuid.v4().toString();

export const useCardNumberElement = ({
  btRef,
  onChange,
  cardTypes,
}: UseCardNumberElementProps) => {
  const type = ElementType.CARD_NUMBER;
  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useCustomBin(cardTypes);

  useBtRefUnmount({ btRef });

  const mask = useMask({
    type,
    id,
  });

  useBtRef({
    btRef,
    elementRef,
    id,
    setElementValue,
  });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    transform: [' ', ''],
    element: {
      id,
      mask,
      type,
    },
    onChange,
  });

  return {
    elementRef,
    elementValue,
    _onChange,
    mask,
  };
};

export type { UseCardNumberElementProps };
