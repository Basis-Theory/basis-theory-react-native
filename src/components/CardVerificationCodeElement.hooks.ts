import type { ForwardedRef } from 'react';
import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ElementType, type BTRef } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';

import { _elementValues } from '../ElementValues';
import { EventConsumer } from './shared/useElementEvent';
import { useUserEventHandlers } from './shared/useUserEventHandlers';
import { useMask } from './shared/useMask';

export type UseCardVerificationCodeElementProps = {
  btRef?: ForwardedRef<BTRef>;
  cvcLength?: number;
  onChange?: EventConsumer;
};

const id = uuid.v4().toString();

export const useCardVerificationCodeElement = ({
  btRef,
  cvcLength = 3,
  onChange,
}: UseCardVerificationCodeElementProps) => {
  const type = ElementType.CVC;

  const textInputRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  const mask = useMask({ maskLength: cvcLength, type });

  useBtRef({ btRef, textInputRef, id, setTextInputValue: setElementValue });

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
