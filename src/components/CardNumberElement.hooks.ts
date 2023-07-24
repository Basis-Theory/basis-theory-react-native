import type { ForwardedRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import uuid from 'react-native-uuid';
import type { BTRef, BTRefBase } from '../BaseElementTypes';
import type { CardNumberVerification } from 'card-validator/dist/card-number';
import cardValidator from 'card-validator';
import { _elementValues } from '../ElementValues';

type Mask = (RegExp | string)[];

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

type UseCardNumberParams = {
  btRef: ForwardedRef<BTRef>;
  inputBtRef?: BTRefBase;
};

export const useCardNumberElement = ({ btRef, inputBtRef }: UseCardNumberParams) => {
  const textInputRef = useRef<TextInput>(null);
  const [id] = useState(uuid.v4() as string);
  const [mask, setMask] = useState<Mask>(defaultCardNumberMask);
  const [textInputValue, setTextInputValue] = useState<string>('');

  useEffect(
    () => () => {
      // this suggests to have btRef as the dep, but we only want to set btRef to
      // null once on unmount
      // eslint-disable-next-line react-hooks/exhaustive-deps, no-param-reassign, unicorn/no-null
      btRef = null;
    },
    []
  );

  useEffect(() => {
    if (inputBtRef) {
      const elementValue = _elementValues[inputBtRef.id];
      const newTextInputValue = inputBtRef.format(
        typeof elementValue === 'string'
          ? elementValue
          : JSON.stringify(elementValue)
      );
      setTextInputValue(newTextInputValue);
    }
  }, [inputBtRef]);

  useEffect(() => {
    const { card } = cardValidator.number(textInputValue, { maxLength: 16 });

    setMask(
      cardNumberMask({
        card,
        cardNumber: textInputValue,
      })
    );
  }, [textInputValue]);

  useEffect(() => {
    const newBtRef = {
      id,
      format: (plaintextValue: string) => plaintextValue,
      clear: () => {
        textInputRef.current?.clear();
      },
      focus: () => {
        textInputRef.current?.focus();
      },
      blur: () => {
        textInputRef.current?.blur();
      },
    };

    if (typeof btRef === 'function') {
      btRef(newBtRef);
    } else if (btRef && typeof btRef === 'object') {
      // eslint-disable-next-line no-param-reassign
      btRef.current = newBtRef;
    }
  }, [btRef, textInputRef, id]);

  return {
    textInputRef,
    id,
    setTextInputValue,
    textInputValue,
    mask,
  };
};
