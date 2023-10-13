import {
  cvv as cardCvvValidator,
  number as cardNumberValidator,
  expirationDate as expirationDateValidator,
} from 'card-validator';

export const useCardValidation = () => {
  const handleValidationResult = (
    isValid: boolean,
    isPotentiallyValid: boolean
  ) => {
    if (!isValid) return isPotentiallyValid ? 'incomplete' : 'invalid';
    return undefined;
  };

  const getMetadataFromCardNumber = (cardNumber: string) => {
    const { card } = cardNumberValidator(cardNumber);

    return {
      brand: card?.type ?? 'unknown',
      lengths: card?.lengths,
      gaps: card?.gaps,
      cvcLenth: card?.code.size ?? 3,
    };
  };

  const validateCardNumber = (cardNumber: string) => {
    const { isValid, isPotentiallyValid } = cardNumberValidator(cardNumber, {
      luhnValidateUnionPay: true,
    });

    return handleValidationResult(isValid, isPotentiallyValid);
  };

  const validateExpirationDate = (expirationDate: string) => {
    const { isValid, isPotentiallyValid } =
      expirationDateValidator(expirationDate);

    return handleValidationResult(isValid, isPotentiallyValid);
  };

  const validateCvc = (cvc: string) => {
    const { isValid, isPotentiallyValid } = cardCvvValidator(cvc, [3, 4]);

    return handleValidationResult(isValid, isPotentiallyValid);
  };

  return {
    getMetadataFromCardNumber,
    validateCardNumber,
    validateExpirationDate,
    validateCvc,
  };
};
