import React from 'react';
import type { TextInputProps } from 'react-native';
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
  onBlur,
  onChange,
  onFocus,
  placeholder,
  placeholderTextColor,
  skipLuhnValidation,
  style,
}: CardNumberProps) => {
  const { elementRef, _onChange, _onBlur, _onFocus, elementValue, mask } =
    useCardNumberElement({
      btRef,
      onBlur,
      onChange,
      onFocus,
      cardTypes,
      skipLuhnValidation,
    });

  return (
    <MaskInput
      editable={editable}
      keyboardType={keyboardType}
      mask={mask}
      onBlur={_onBlur}
      onChangeText={_onChange}
      onFocus={_onFocus}
      placeholder={placeholder}
      placeholderFillCharacter=""
      placeholderTextColor={placeholderTextColor}
      ref={elementRef}
      style={style}
      value={elementValue}
    />
  );
};
