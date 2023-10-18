import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { useTextElement, UseTextElementProps } from './TextElement.hooks';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';

type TextElementProps = {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
} & UseTextElementProps;

export const TextElement = ({
  btRef,
  style,
  editable,
  placeholder,
  onChange,
  mask,
}: TextElementProps) => {
  const { textInputRef, textInputValue, _mask, _onChange } = useTextElement({
    btRef,
    onChange,
    mask,
  });

  return (
    <MaskInput
      editable={editable}
      mask={_mask}
      onChangeText={_onChange}
      placeholder={placeholder}
      placeholderFillCharacter=""
      ref={textInputRef}
      style={style}
      value={textInputValue}
    />
  );
};
