import { findIndex, isNil } from 'ramda';
import { ElementType } from '../../BaseElementTypes';
import { _elementValues } from '../../ElementValues';
import { type CardMetadata, useCardMetadata } from './useCardMetadata';
import { extractDigits } from './utils';

type UseMask = { maskLength?: number; type: ElementType; id?: string };

const DEFAULT_CARD_NUMBER_MASK = [
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

const createCardMask = (cardNumber: string, card: CardMetadata) => {
  if (isNil(card) || isNil(card?.lengths) || isNil(card?.gaps)) {
    return DEFAULT_CARD_NUMBER_MASK;
  }

  const digitsOnly = extractDigits(cardNumber) ?? '';

  const lengthIndex = findIndex(
    (length) => length > digitsOnly.length,
    card.lengths
  );

  const length =
    lengthIndex >= 0
      ? card.lengths[lengthIndex]
      : card.lengths[card.lengths.length - 1];

  const mask = Array.from<string | RegExp>({ length }).fill(/\d/u);

  card.gaps?.forEach((gap, i) => {
    mask.splice(gap + i, 0, ' ');
  });

  return mask;
};

const createCvcMask = (maskLength?: number) => {
  const length =
    maskLength == undefined || maskLength > 4 || maskLength < 3
      ? 4
      : maskLength;

  return Array.from<string | RegExp>({ length }).fill(/\d/u);
};

export const useMask = ({ maskLength, type, id }: UseMask) => {
  const { getMetadataFromCardNumber } = useCardMetadata();

  if (type === ElementType.CVC) {
    return createCvcMask(maskLength);
  }

  if (type === ElementType.CARD_NUMBER) {
    if (id) {
      const cardNumber = _elementValues[id];
      const card = getMetadataFromCardNumber(cardNumber);

      const mask = createCardMask(cardNumber, card);

      return mask;
    }

    return DEFAULT_CARD_NUMBER_MASK;
  }

  if (type === ElementType.EXPIRATION_DATE) {
    return [/\d/u, /\d/u, '/', /\d/u, /\d/u];
  }

  return undefined;
};
