import { Token } from '@basis-theory/basis-theory-js/types/models';
import {
  anyPass,
  equals,
  is,
  isEmpty,
  isNil,
  max,
  reduce,
  reject,
  replace,
  type,
} from 'ramda';
import type { BTRef } from '../BaseElementTypes';
import { _elementValues } from '../ElementValues';

export const isString = is(String);
export const isBoolean = is(Boolean);
export const isNumber = is(Number);
export const isRegExp = is(RegExp);
export const isNilOrEmpty = anyPass([isNil, isEmpty]);

export const extractDigits = (value: string = ''): string | undefined =>
  value ? replace(/\D+/gu, '', value) : undefined;

export const isObject = (val: unknown): val is Record<string, unknown> =>
  equals('Object', type(val));

export const isToken = (val: unknown): val is Token =>
  !isNil((val as Token).data) && !isNil((val as Token).type);

export const isBtRef = (val: unknown): val is BTRef =>
  !isNil(_elementValues[(val as BTRef).id]);

export const isPrimitive = anyPass([isString, isBoolean, isNumber, isNil]);

export const removeMax = (list: number[]) =>
  reject(equals(reduce(max, -Infinity, list)), list);
