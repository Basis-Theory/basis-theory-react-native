import { assoc, cond, identity, isNil, map, mapObjIndexed } from 'ramda';
import uuid from 'react-native-uuid';
import type { PrimitiveType } from '../BaseElementTypes';
import { _elementValues } from '../ElementValues';
import {
  isObject,
  isPrimitive,
  isToken,
  isBtRef,
  isBtDateRef,
  isString,
} from './shared';

const createBtInputRef = (value: PrimitiveType) => {
  if (isNil(value)) return null;

  const id = uuid.v4().toString();

  _elementValues[id] = value;

  return {
    id,
    format: (plaintextValue: string) => plaintextValue,
  };
};

const replaceSensitiveData = (val: unknown): unknown =>
  cond([
    [isToken, (val) => assoc('data', replaceSensitiveData(val.data), val)],
    [isPrimitive, createBtInputRef],
    [isObject, mapObjIndexed(replaceSensitiveData)],
    [Array.isArray, map(replaceSensitiveData)],
  ])(val);

const replaceElementRefs = <T>(val: unknown): T =>
  cond([
    [isPrimitive, identity],
    [
      isBtDateRef,
      (val) => {
        const value = _elementValues[val.id] as string;

        if (isString(value)) {
          return val.datepart === 'month'
            ? value.split('/')[0]
            : `20${value.split('/')[1]}`;
        } else {
          return undefined;
        }
      },
    ],
    [
      isBtRef,
      (val) => {
        const value = (_elementValues as Record<string, unknown>)[val.id];
        if (!value) {
          return undefined;
        }

        return value;
      },
    ],
    [Array.isArray, map(replaceElementRefs)],
    [isObject, mapObjIndexed(replaceElementRefs)],
  ])(val) as T;

export { replaceElementRefs, replaceSensitiveData };
