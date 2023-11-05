import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { useTextElement, UseTextElementProps } from './TextElement.hook';
import MaskInput from 'react-native-mask-input';

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
      ref={elementRef}
      style={style}
      value={elementValue}
    />
  );
};
