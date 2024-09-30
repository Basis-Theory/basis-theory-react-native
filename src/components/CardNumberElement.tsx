import React from 'react';
import type { StyleProp, TextStyle, TextInputProps } from 'react-native';
import MaskInput from 'react-native-mask-input';
import type { UseCardNumberElementProps } from './CardNumberElement.hook';
import { useCardNumberElement } from './CardNumberElement.hook';

type TextInputSupportedProps =
  | 'editable'
  | 'keyboardType'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'style';

type CardNumberProps = UseCardNumberElementProps &
  Pick<TextInputProps, TextInputSupportedProps>;

export const CardNumberElement = ({
  btRef,
  cardTypes,
  editable,
  keyboardType,
  onChange,
  placeholder,
  placeholderTextColor,
  style,
}: CardNumberProps) => {
  const { elementRef, _onChange, elementValue, mask } = useCardNumberElement({
    btRef,
    onChange,
    cardTypes,
  });

  return (
    <MaskInput
      editable={editable}
      keyboardType={keyboardType}
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
