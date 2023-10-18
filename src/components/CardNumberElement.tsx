import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import {
  useCardNumberElement,
  UseCardNumberElementProps,
} from './CardNumberElement.hooks';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';

type CardNumberProps = {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
} & UseCardNumberElementProps;

export const CardNumberElement = ({
  btRef,
  style,
  editable,
  placeholder,
  onChange,
}: CardNumberProps) => {
  const { textInputRef, _onChange, textInputValue, mask } =
    useCardNumberElement({
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
      ref={textInputRef}
      style={style}
      value={textInputValue}
    />
  );
};
