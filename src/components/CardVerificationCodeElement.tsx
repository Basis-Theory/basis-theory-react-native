import React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import type {
  UseCardVerificationCodeElementProps} from './CardVerificationCodeElement.hook';
import {
  useCardVerificationCodeElement
} from './CardVerificationCodeElement.hook';

type CardVerificationCodeProps = UseCardVerificationCodeElementProps & {
  style: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
};

export const CardVerificationCodeElement = ({
  btRef,
  style,
  editable,
  placeholder,
  cvcLength,
  onChange,
  placeholderTextColor,
}: CardVerificationCodeProps) => {
  const { elementRef, elementValue, mask, _onChange } =
    useCardVerificationCodeElement({
      btRef,
      cvcLength,
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
