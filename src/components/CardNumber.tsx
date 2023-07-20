import type { ForwardedRef } from 'react';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import type { BTRef } from '../BaseElementTypes';
import { useCardNumber } from './CardNumber.hooks';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';

type CardNumberProps = {
  btRef: ForwardedRef<BTRef>;
  style: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
};

export const CardNumber = ({
  btRef,
  style,
  editable,
  placeholder,
}: CardNumberProps) => {
  const { textInputRef, id, setTextInputValue, textInputValue, mask } =
    useCardNumber({
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
