import { number as _cardNumberValidator } from 'card-validator';

export type CardMetadata = {
  brand: string;
  lengths: number[] | undefined;
  gaps: number[] | undefined;
  cvcLenth: number;
};

export const useCardMetadata = () => {
  const getMetadataFromCardNumber = (cardNumber: string): CardMetadata => {
    const { card } = _cardNumberValidator(cardNumber, {
      luhnValidateUnionPay: true,
    });

    return {
      brand: card?.type ?? 'unknown',
      lengths: card?.lengths,
      gaps: card?.gaps,
      cvcLenth: card?.code.size ?? 4,
    };
  };

  return {
    getMetadataFromCardNumber,
  };
};
