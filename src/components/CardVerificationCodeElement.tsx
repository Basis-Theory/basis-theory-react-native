import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';
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
}: CardVerificationCodeProps) => {
  const { textInputRef, id, setTextInputValue, textInputValue, mask } =
    useCardVerificationCodeElement({
      btRef,
    });

  return (
    <MaskInput
      editable={editable}
      mask={mask}
      onChangeText={(masked) => {
        _elementValues[id] = masked;
        setTextInputValue(masked);
      }}
      placeholder={placeholder}
      placeholderFillCharacter=""
      ref={textInputRef}
      style={style}
      value={textInputValue}
    />
  );
};
