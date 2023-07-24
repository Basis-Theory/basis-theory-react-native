import type { ForwardedRef } from 'react';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import type { BTRef, BTRefBase } from '../BaseElementTypes';
import { useCardNumberElement } from './CardNumberElement.hooks';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';

type CardNumberProps = {
  btRef: ForwardedRef<BTRef>;
  inputBtRef?: BTRefBase;
  style: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
};

export const CardNumberElement = ({
  btRef,
  style,
  editable,
  placeholder,
  inputBtRef,
}: CardNumberProps) => {
  const { textInputRef, id, setTextInputValue, textInputValue, mask } =
    useCardNumberElement({
      btRef,
      inputBtRef,
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
