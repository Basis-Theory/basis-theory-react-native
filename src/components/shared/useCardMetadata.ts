import { number as _cardNumberValidator } from 'card-validator';
import { extractDigits } from '../../utils/shared';

export type CardMetadata = {
  brand: string;
  lengths: number[] | undefined;
  gaps: number[] | undefined;
  cvcLength?: number;
  cardLast4?: string;
  cardBin?: string;
};

export const useCardMetadata = () => {
  const getMetadataFromCardNumber = (cardNumber: string): CardMetadata => {
    const { card, isValid } = _cardNumberValidator(cardNumber, {
      luhnValidateUnionPay: true,
    });

    const sanitizedCardNumber =
      isValid && cardNumber ? extractDigits(cardNumber) : undefined;

    const cardLast4 = sanitizedCardNumber
      ? sanitizedCardNumber.slice(-4)
      : undefined;

    const cardBin = sanitizedCardNumber
      ? sanitizedCardNumber.length < 16
        ? sanitizedCardNumber.slice(0, 6)
        : sanitizedCardNumber.slice(0, 8)
      : undefined;

    return {
      cardLast4,
      cardBin,
      brand: card?.type ?? 'unknown',
      lengths: card?.lengths,
      gaps: card?.gaps,
      cvcLength: card?.code.size,
    };
  };

  return {
    getMetadataFromCardNumber,
  };
};
