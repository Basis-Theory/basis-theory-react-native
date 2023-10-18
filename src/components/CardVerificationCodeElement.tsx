import React from 'react';
import { Text, type StyleProp, type TextStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import {
  useCardVerificationCodeElement,
  UseCardVerificationCodeElementProps,
} from './CardVerificationCodeElement.hooks';

type CardVerificationCodeProps = {
  style: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
} & UseCardVerificationCodeElementProps;

export const CardVerificationCodeElement = ({
  btRef,
  style,
  editable,
  placeholder,
  cvcLength,
  onChange,
}: CardVerificationCodeProps) => {
  const { textInputRef, textInputValue, mask, _onChange } =
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
      ref={textInputRef}
      style={style}
      value={textInputValue}
    />
  );
};
