import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import type { BTRef, InputBTRef, Mask } from '../BaseElementTypes';
import type { CardNumberVerification } from 'card-validator/dist/card-number';
import cardValidator from 'card-validator';
import { _elementValues } from '../ElementValues';
import { useBtRefUnmount } from './shared/useBtRefUnmount.hooks';
import { useBtRef } from './shared/useBtRef.hooks';

const defaultCardNumberMask = [
  /\d/u,
  /\d/u,
  /\d/u,
  /\d/u,
  ' ',
  /\d/u,
  /\d/u,
  /\d/u,
  /\d/u,
  ' ',
  /\d/u,
  /\d/u,
  /\d/u,
  /\d/u,
  ' ',
  /\d/u,
  /\d/u,
  /\d/u,
  /\d/u,
];

type CardNumberMaskParams = Pick<CardNumberVerification, 'card'> & {
  cardNumber: string;
};

const cardNumberMask = ({ cardNumber, card }: CardNumberMaskParams): Mask => {
  let mask = defaultCardNumberMask;

  const digitsOnly = cardNumber.replace(/\D+/gu, '');

  if (card) {
    // find current length index
    const lIndex = card.lengths.findIndex((l) => l > digitsOnly.length);
    const length = (card.lengths[lIndex] ||
      card.lengths[card.lengths.length - 1]) as number;

    // initialize a \d mask with current length
    mask = Array.from<RegExp | string>({ length }).fill(/\d/u);

    // replaces gaps with whitespace
    card.gaps.forEach((gap, i) => {
      mask.splice(gap + i, 0, ' ');
    });
  }

  return mask;
};

export type UseCardNumberElementProps = {
  btRef?: ForwardedRef<BTRef>;
};

export const useCardNumberElement = ({ btRef }: UseCardNumberElementProps) => {
  const textInputRef = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  const [mask, setMask] = useState<Mask>(defaultCardNumberMask);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useBtRefUnmount({ btRef });

  useEffect(() => {
    const { card } = cardValidator.number(textInputValue, { maxLength: 16 });

    setMask(
      cardNumberMask({
        card,
        cardNumber: textInputValue,
      })
    );
  }, [textInputValue]);

  useBtRef({ btRef, textInputRef, id, setTextInputValue });

  return {
    textInputRef,
    id,
    setTextInputValue,
    textInputValue,
    mask,
  };
};
