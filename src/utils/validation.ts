import { cvv, expirationDate, number } from 'card-validator';
import { isEmpty, partial, split } from 'ramda';
import type { Mask, ValidationResult } from '../BaseElementTypes';
import { ElementType } from '../BaseElementTypes';
import {
  extractDigits,
  filterOutMaxOccurrences,
  isRegExp,
  isString,
} from './shared';

type ValidatorResult = {
  isValid: boolean;
  isPotentiallyValid: boolean;
};

type ValidatorFunction = (value: string) => ValidatorResult;

const _cardCvvValidator = (length = [3, 4], value: string) =>
  cvv(value, length);

interface CardNumberValidatorOptions {
  skipLuhnValidation?: boolean;
}

interface TextValidatorOptions {
  mask?: Mask;
}

interface CvcValidatorOptions {
  cvcLength?: number[];
}

export type ValidatorOptions = CardNumberValidatorOptions &
  TextValidatorOptions &
  CvcValidatorOptions;

const _cardNumberValidator = (
  options: CardNumberValidatorOptions = {},
  value: string
) => {
  const { isValid, isPotentiallyValid, card } = number(value, {
    luhnValidateUnionPay: true,
    skipLuhnValidation: options?.skipLuhnValidation ?? false,
  });

  const brandsWithMultipleCardLenghts = [
    'diners-club',
    'discover',
    'jcb',
    'maestro',
    'mir',
    'unionpay',
    'visa',
  ];

  const cardNumber = extractDigits(value);

  // overrides "card validator" defaults for cards with multiple number lengths
  // that could be valid
  const expectedLengths =
    card && brandsWithMultipleCardLenghts.includes(card.type)
      ? filterOutMaxOccurrences(card.lengths)
      : [];

  if (
    cardNumber &&
    expectedLengths.includes(cardNumber.length) &&
    !isValid &&
    isPotentiallyValid
  ) {
    return {
      isValid: false,
      isPotentiallyValid: false,
    };
  }

  return {
    isValid,
    isPotentiallyValid,
  };
};
const _expirationDateValidator = expirationDate;

// eslint-disable-next-line @typescript-eslint/default-param-last
const _maskValidator = (options: ValidatorOptions = {}, value: string) => {
  const mask = options?.mask ?? [];

  /**
   * Combines two arrays element-wise using a specified function.
   *
   * @param {function(T, U): V} fn - A function that combines elements from the first and second arrays.
   * @param {T[]} a - The first array.
   * @param {U[]} b - The second array.
   *
   * @returns {V[]} An array containing the result of applying the function to corresponding elements of the input arrays.
   */
  const zipWith = <T, U, V>(fn: (a: T, b: U) => V, a: T[], b: U[]): V[] =>
    a.map((x, i) => fn(x, b[i]));

  const matchMaskCharAtIndex = (
    maskChar: RegExp | string,
    valChar: string
  ): boolean =>
    isRegExp(maskChar)
      ? maskChar.test(valChar)
      : isString(maskChar) && maskChar === valChar;

  const isValid = zipWith(matchMaskCharAtIndex, mask, value.split('')).every(
    Boolean
  );

  const isPotentiallyValid = zipWith(
    matchMaskCharAtIndex,
    mask.slice(0, value.length),
    split('', value)
  ).every(Boolean);

  return {
    isValid,
    isPotentiallyValid,
  };
};

const handleValidationResult = (
  isValid: boolean,
  isPotentiallyValid: boolean
) => {
  if (!isValid) return isPotentiallyValid ? 'incomplete' : 'invalid';

  return undefined;
};

const runValidator = (
  fieldValue: string,
  validatorFn: ValidatorFunction
): ValidationResult => {
  const { isValid: _isValid, isPotentiallyValid: _isPotentiallyValid } =
    validatorFn(fieldValue);

  const isPotentiallyValid = !isEmpty(fieldValue) && _isPotentiallyValid;
  const isValid = isEmpty(fieldValue) || _isValid;

  return handleValidationResult(isValid, isPotentiallyValid);
};

const cardNumberValidator = (
  cardNumber: string,
  validatorOptions?: ValidatorOptions
): ValidationResult =>
  runValidator(cardNumber, partial(_cardNumberValidator, [validatorOptions]));

const cardExpirationDateValidator = (
  expirationDate: string
): ValidationResult => runValidator(expirationDate, _expirationDateValidator);

const cardVerificationCodeValidator = (
  cvc: string,
  validatorOptions?: ValidatorOptions
): ValidationResult =>
  runValidator(cvc, partial(_cardCvvValidator, [validatorOptions?.cvcLength]));

const textMaskValidator = (
  value: string,
  validatorOptions?: ValidatorOptions
): ValidationResult =>
  runValidator(value, partial(_maskValidator, [validatorOptions]));

export const _getValidationStrategy = (elementType: ElementType) =>
  ({
    [ElementType.CVC]: cardVerificationCodeValidator,
    [ElementType.EXPIRATION_DATE]: cardExpirationDateValidator,
    [ElementType.CARD_NUMBER]: cardNumberValidator,
    [ElementType.TEXT]: textMaskValidator,
  })[elementType];
