import type { ForwardedRef } from 'react';
import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { BasisTheoryElements } from '../BasisTheoryElements';
import type { BTRef } from '../BaseElementTypes';
import { useCardNumber } from './CardNumber.hooks';
import MaskInput from 'react-native-mask-input';

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
        BasisTheoryElements.updateElementValue(id, masked);
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
