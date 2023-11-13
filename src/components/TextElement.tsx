import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { useTextElement, UseTextElementProps } from './TextElement.hook';
import MaskInput from 'react-native-mask-input';

type TextElementProps = {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
} & UseTextElementProps;

export const TextElement = ({
  btRef,
  editable,
  mask,
  onChange,
  placeholder,
  placeholderTextColor,
  style,
}: TextElementProps) => {
  const { elementRef, elementValue, _onChange } = useTextElement({
    btRef,
    onChange,
    mask,
  });

  return (
    <MaskInput
      editable={editable}
      mask={mask}
      onChangeText={_onChange}
      placeholder={placeholder}
      placeholderFillCharacter=""
      placeholderTextColor={placeholderTextColor}
      ref={elementRef}
      style={style}
      value={elementValue}
    />
  );
};
