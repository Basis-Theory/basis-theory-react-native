import type { Token } from '@basis-theory/basis-theory-js/types/models';
import { anyPass, equals, is, isEmpty, isNil, replace, type } from 'ramda';
import type { BTRef, InputBTRefWithDatepart } from '../BaseElementTypes';
import { _elementValues } from '../ElementValues';

const isString = is(String);
const isBoolean = is(Boolean);
const isNumber = is(Number);
const isRegExp = is(RegExp);
const isNilOrEmpty = anyPass([isNil, isEmpty]);

const extractDigits = (value = ''): string | undefined =>
  value ? replace(/\D+/gu, '', value) : undefined;

const isObject = (val: unknown): val is Record<string, unknown> =>
  equals('Object', type(val));

const isToken = (val: unknown): val is Token =>
  !isNil((val as Token).data) && !isNil((val as Token).type);

const isBtRef = (val: unknown): val is BTRef =>
  !isNil(_elementValues[(val as BTRef).id]);

const isBtDateRef = (val: unknown): val is InputBTRefWithDatepart =>
  Boolean((val as InputBTRefWithDatepart).datepart);

const isPrimitive = anyPass([isString, isBoolean, isNumber, isNil]);

/**
 * Removes all occurrences of the maximum value from an array of numbers.
 */
const filterOutMaxOccurrences = (numbers: number[]) =>
  numbers.filter((num) => num !== Math.max(...numbers));

export {
  extractDigits,
  filterOutMaxOccurrences,
  isBoolean,
  isBtDateRef,
  isBtRef,
  isNilOrEmpty,
  isNumber,
  isObject,
  isPrimitive,
  isRegExp,
  isString,
  isToken,
};
