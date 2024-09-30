import React from 'react';
import type { TextInputProps } from 'react-native';
import MaskInput from 'react-native-mask-input';
import type { UseCardExpirationDateElementProps } from './CardExpirationDateElement.hook';
import { useCardExpirationDateElement } from './CardExpirationDateElement.hook';

type TextInputSupportedProps =
  | 'editable'
  | 'keyboardType'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'style';

type CardExpirationDateProps = UseCardExpirationDateElementProps &
  Pick<TextInputProps, TextInputSupportedProps>;

export const CardExpirationDateElement = ({
  btRef,
  editable,
  keyboardType,
  onChange,
  placeholder,
  placeholderTextColor,
  style,
}: CardExpirationDateProps) => {
  const { elementRef, _onChange, elementValue, mask } =
    useCardExpirationDateElement({
      btRef,
      onChange,
    });

  return (
    <MaskInput
      editable={editable}
      keyboardType={keyboardType}
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
