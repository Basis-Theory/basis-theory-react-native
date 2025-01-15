import type { CreditCardType } from '@basis-theory/basis-theory-js/types/elements';
import { creditCardType } from 'card-validator';
import { always, compose, groupBy, ifElse, isEmpty } from 'ramda';
import { useEffect, useState } from 'react';

const throwIfDuppedCardConfig = ifElse(
  (arr: (CreditCardType[] | undefined)[]) =>
    arr.some((el) => el && el.length > 1),
  () => {
    const msg = `Detected multiple cardType objects with the same type in the element configuration.`;

    throw new Error(msg);
  },
  always(false)
);

const groupByCreditCardType = groupBy((obj: CreditCardType) => obj['type']);

const checkDuppedCards = compose(
  throwIfDuppedCardConfig,
  Object.values,
  groupByCreditCardType
);

export const useCustomBin = (cardTypes?: CreditCardType[]) => {
  // keep the count in internal state to prevent creditCardType from blowing up when
  // there are multiple renders
  const [cardTypesCount, setCardTypeCount] = useState(0);

  useEffect(() => {
    if (
      cardTypes &&
      cardTypesCount !== cardTypes.length &&
      !isEmpty(cardTypes) &&
      !checkDuppedCards(cardTypes)
    ) {
      setCardTypeCount(cardTypes.length);

      // removes existing cardTypes from creditCardType
      [
        'visa',
        'mastercard',
        'american-express',
        'diners-club',
        'discover',
        'jcb',
        'unionpay',
        'maestro',
        'elo',
        'mir',
        'hiper',
        'hipercard',
      ].forEach(creditCardType.removeCard);

      // we append new cardTypes to creditCardType
      // if creditCardType.type already exists, it gets overwritten
      // @ts-expect-error types mismatch between our types and creditCardType's
      cardTypes.forEach(creditCardType.addCard);
    }
  }, [cardTypes]);
};
