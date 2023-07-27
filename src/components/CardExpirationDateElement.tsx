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
}: CardExpirationDateProps) => {
  const { textInputRef, id, setTextInputValue, textInputValue, mask } =
    useCardExpirationDateElement({
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
