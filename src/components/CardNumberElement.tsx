import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import type {
  UseCardNumberElementProps} from './CardNumberElement.hook';
import {
  useCardNumberElement
} from './CardNumberElement.hook';
import MaskInput from 'react-native-mask-input';

type CardNumberProps = UseCardNumberElementProps & {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
};

export const CardNumberElement = ({
  btRef,
  style,
  editable,
  placeholder,
  placeholderTextColor,
  onChange,
}: CardNumberProps) => {
  const { elementRef, _onChange, elementValue, mask } = useCardNumberElement({
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
