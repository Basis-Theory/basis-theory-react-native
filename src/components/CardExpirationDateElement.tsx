import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';
import {
  useCardExpirationDateElement,
  UseCardExpirationDateElementProps,
} from './CardExpirationDateElement.hooks';

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
  const { textInputRef, _onChange, textInputValue, mask } =
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
      ref={textInputRef}
      style={style}
      value={textInputValue}
    />
  );
};
