import React from 'react';
import { type TextInputProps } from 'react-native';
import MaskInput from 'react-native-mask-input';
import type { UseCardVerificationCodeElementProps } from './CardVerificationCodeElement.hook';
import { useCardVerificationCodeElement } from './CardVerificationCodeElement.hook';

type TextInputSupportedProps =
  | 'editable'
  | 'keyboardType'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'style';

type CardVerificationCodeProps = UseCardVerificationCodeElementProps &
  Pick<TextInputProps, TextInputSupportedProps>;

export const CardVerificationCodeElement = ({
  btRef,
  cvcLength,
  editable,
  keyboardType,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  placeholderTextColor,
  style,
}: CardVerificationCodeProps) => {
  const { elementRef, elementValue, mask, _onChange, _onBlur, _onFocus } =
    useCardVerificationCodeElement({
      btRef,
      cvcLength,
      onChange,
      onBlur,
      onFocus,
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
