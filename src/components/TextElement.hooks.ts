import type { ForwardedRef } from 'react';
import { useMemo, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import { ElementType, type BTRef, type Mask } from '../BaseElementTypes';
import { useBtRefUnmount } from './shared/useBtRefUnmount';
import { useBtRef } from './shared/useBtRef';
import { EventConsumer } from './shared/useElementEvent';
import { useUserEventHandlers } from './shared/useUserEventHandlers';

export type UseTextElementProps = {
  btRef?: ForwardedRef<BTRef>;
  mask?: Mask;
  onChange?: EventConsumer;
};

export const useTextElement = ({
  btRef,
  mask,
  onChange,
}: UseTextElementProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  const id = useMemo(() => uuid.v4().toString(), []);

  useBtRefUnmount({ btRef });

  useBtRef({ btRef, textInputRef, id, setTextInputValue: setElementValue });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    element: { id, mask, type: ElementType.TEXT },
    onChange: onChange,
  });

  return {
    textInputRef,
    _onChange,
    textInputValue: elementValue,
    _mask: mask,
  };
};
