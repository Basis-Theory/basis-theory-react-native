import type { ForwardedRef } from 'react';
import { useRef, useState } from 'react';
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

const id = uuid.v4().toString();

export const useTextElement = ({
  btRef,
  mask,
  onChange,
}: UseTextElementProps) => {
  const elementRef = useRef<TextInput>(null);
  const [elementValue, setElementValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useBtRef({ btRef, elementRef, id, setElementValue });

  const { _onChange } = useUserEventHandlers({
    setElementValue,
    element: { id, mask, type: ElementType.TEXT },
    onChange: onChange,
  });

  return {
    elementRef,
    _onChange,
    elementValue,
  };
};
