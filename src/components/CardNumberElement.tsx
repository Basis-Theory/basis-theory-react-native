import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import {
  useCardNumberElement,
  UseCardNumberElementProps,
} from './CardNumberElement.hook';
import MaskInput from 'react-native-mask-input';
import { _elementValues } from '../ElementValues';

type CardNumberProps = {
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  placeholder?: string;
} & UseCardNumberElementProps;

export const CardNumberElement = ({
  btRef,
  style,
  editable,
  placeholder,
  onChange,
}: CardNumberProps) => {
  const { elementRef, _onChange, elementValue, mask } = useCardNumberElement({
    btRef,
    onChange,
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
