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
}: TextElementProps) => {
  const { textInputRef, id, setTextInputValue, textInputValue, mask } =
    useTextElement({
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
