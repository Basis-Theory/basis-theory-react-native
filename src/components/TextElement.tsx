import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import type { UseTextElementProps } from './TextElement.hook';
import { useTextElement } from './TextElement.hook';
import MaskInput from 'react-native-mask-input';

type TextElementProps = UseTextElementProps & {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
};

export const TextElement = ({
  btRef,
  editable,
  mask,
  onChange,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
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
      secureTextEntry={secureTextEntry}
      style={style}
      value={elementValue}
    />
  );
};
