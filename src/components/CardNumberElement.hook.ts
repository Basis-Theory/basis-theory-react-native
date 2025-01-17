import type { CreditCardType } from '@basis-theory/basis-theory-js/types/elements';
import type { ForwardedRef } from 'react';
import { useId, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import {
  ElementType,
  type BTRef,
  type EventConsumers,
} from '../BaseElementTypes';
import { useBtRef } from './shared/useBtRef';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useMask } from './shared/useMask';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useCustomBin } from './useCustomBin.hook';
import { useCleanupStateBeforeUnmount } from './shared/useCleanStateOnUnmount';

type UseCardNumberElementProps = {
  btRef?: ForwardedRef<BTRef>;
  cardTypes?: CreditCardType[];
  skipLuhnValidation?: boolean;
} & EventConsumers;

export const useCardNumberElement = ({
  btRef,
  onBlur,
  onChange,
  onFocus,
  cardTypes,
  skipLuhnValidation,
}: UseCardNumberElementProps) => {
  const id = useId();

  const type = ElementType.CARD_NUMBER;
  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useCleanupStateBeforeUnmount(id);

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

  const { _onChange, _onBlur, _onFocus } = useUserEventHandlers({
    setElementValue,
    transform: [' ', ''],
    element: {
      id,
      validatorOptions: { mask, skipLuhnValidation },
      type,
    },
    onChange,
    onBlur,
    onFocus,
  });

  return {
    elementRef,
    elementValue,
    _onChange,
    _onBlur,
    _onFocus,
    mask,
  };
};

export type { UseCardNumberElementProps };
