import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import {
  useCardExpirationDateElement,
  UseCardExpirationDateElementProps,
} from './CardExpirationDateElement.hook';

type CardExpirationDateProps = {
  style: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
} & UseCardExpirationDateElementProps;

export const CardExpirationDateElement = ({
  btRef,
  style,
  editable,
  placeholder,
  onChange,
}: CardExpirationDateProps) => {
  const { elementRef, _onChange, elementValue, mask } =
    useCardExpirationDateElement({
      btRef,
      onChange,
    });

  return (
    <MaskInput
      editable={editable}
      mask={mask}
      onChangeText={_onChange}
      placeholder={placeholder}
      placeholderFillCharacter=""
      ref={elementRef}
      style={style}
      value={elementValue}
    />
  );
};
