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
  onBlur,
  onChange,
  onFocus,
  placeholder,
  placeholderTextColor,
  style,
}: CardExpirationDateProps) => {
  const { elementRef, _onChange, _onBlur, _onFocus, elementValue, mask } =
    useCardExpirationDateElement({
      btRef,
      onBlur,
      onChange,
      onFocus,
    });

  return (
    <MaskInput
      editable={editable}
      keyboardType={keyboardType}
      mask={mask}
      onBlur={_onBlur}
      onChangeText={_onChange}
      onFocus={_onFocus}
      placeholder={placeholder}
      placeholderFillCharacter=""
      placeholderTextColor={placeholderTextColor}
      ref={elementRef}
      style={style}
      value={elementValue}
    />
  );
};
