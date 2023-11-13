import { cvv, expirationDate, number } from 'card-validator';
import { T, always, cond, equals, flip, isEmpty, partial, split } from 'ramda';
import type { Mask, ValidationResult } from '../BaseElementTypes';
import { ElementType } from '../BaseElementTypes';
import { extractDigits, isRegExp, isString, removeMax } from './shared';

type ValidatorResult = {
  isValid: boolean;
  isPotentiallyValid: boolean;
};

type ValidatorFunction = (value: string) => ValidatorResult;

const _cardCvvValidator = partial(flip(cvv), [[3, 4]]);

const _cardNumberValidator = (value: string) => {
  const { isValid, isPotentiallyValid, card } = number(value, {
    luhnValidateUnionPay: true,
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
      ? removeMax(card.lengths)
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
const _maskValidator = (mask: Mask = [], value: string) => {
  const customZip = <T, U, V>(fn: (a: T, b: U) => V, a: T[], b: U[]): V[] =>
    a.map((x, i) => fn(x, b[i]));

  const matchMaskCharAtIndex = (
    maskChar: RegExp | string,
    valChar: string
  ): boolean =>
    isRegExp(maskChar)
      ? maskChar.test(valChar)
      : isString(maskChar) && maskChar === valChar;

  const isValid = customZip(matchMaskCharAtIndex, mask, value.split('')).every(
    Boolean
  );

  const isPotentiallyValid = customZip(
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

const cardNumberValidator = (cardNumber: string): ValidationResult =>
  runValidator(cardNumber, _cardNumberValidator);

const cardExpirationDateValidator = (
  expirationDate: string
): ValidationResult => runValidator(expirationDate, _expirationDateValidator);

const cardVerificationCodeValidator = (cvc: string): ValidationResult =>
  runValidator(cvc, _cardCvvValidator);

const textMaskValidator = (value: string, mask?: Mask): ValidationResult =>
  runValidator(value, partial(_maskValidator, [mask]));

export const _getValidationStrategy = cond([
  [equals(ElementType.CVC), always(cardVerificationCodeValidator)],
  [equals(ElementType.EXPIRATION_DATE), always(cardExpirationDateValidator)],
  [equals(ElementType.CARD_NUMBER), always(cardNumberValidator)],
  [equals(ElementType.TEXT), always(textMaskValidator)],
  [T, always(() => undefined)],
]);
