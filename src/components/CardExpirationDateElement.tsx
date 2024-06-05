import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import type { UseCardExpirationDateElementProps } from './CardExpirationDateElement.hook';
import { useCardExpirationDateElement } from './CardExpirationDateElement.hook';

type CardExpirationDateProps = UseCardExpirationDateElementProps & {
  style: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
};

export const CardExpirationDateElement = ({
  btRef,
  style,
  editable,
  placeholder,
  placeholderTextColor,
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
      placeholderTextColor={placeholderTextColor}
      ref={elementRef}
      style={style}
      value={elementValue}
    />
  );
};
