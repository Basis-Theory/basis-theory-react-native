import React from 'react';
import type { TextInputProps } from 'react-native';
import type { UseTextElementProps } from './TextElement.hook';
import { useTextElement } from './TextElement.hook';
import MaskInput from 'react-native-mask-input';

type TextInputSupportedProps =
  | 'editable'
  | 'keyboardType'
  | 'maxLength'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'secureTextEntry'
  | 'style'
  | 'textContentType';

type TextElementProps = UseTextElementProps &
  Pick<TextInputProps, TextInputSupportedProps>;

export const TextElement = ({
  btRef,
  editable,
  keyboardType,
  mask,
  maxLength,
  onChange,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  style,
  textContentType,
}: TextElementProps) => {
  const { elementRef, elementValue, _onChange } = useTextElement({
    btRef,
    onChange,
    mask,
  });

  return (
    <MaskInput
      editable={editable}
      keyboardType={keyboardType}
      mask={mask}
      maxLength={maxLength}
      onChangeText={_onChange}
      placeholder={placeholder}
      placeholderFillCharacter=""
      placeholderTextColor={placeholderTextColor}
      ref={elementRef}
      secureTextEntry={secureTextEntry}
      style={style}
      textContentType={textContentType}
      value={elementValue}
    />
  );
};
