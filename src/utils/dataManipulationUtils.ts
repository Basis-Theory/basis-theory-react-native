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
import { logger } from './logging';

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
    // this one should always be evaluated first and ramda doesn't like _elementValues types when using recursion & identity
    [
      isBtDateRef,
      (val) => {
        const value = _elementValues[val.id] as string;

        if (isString(value)) {
          return val.datepart === 'month'
            ? value.split('/')[0]
            : `20${value.split('/')[1]}`;
        } else {
          const err = new Error(
            `Couldn't find value for element "${val.id}". Make sure the element is initialized correctly and that it contains a valid value.`
          );

          logger.log.error('Error while replacing element refs', err);

          throw err;
        }
      },
    ],
    [isBtRef, (val) => (_elementValues as Record<string, unknown>)[val.id]],
    [Array.isArray, map(replaceElementRefs)],
    [isObject, mapObjIndexed(replaceElementRefs)],
    [isPrimitive, identity],
  ])(val) as T;

export { replaceElementRefs, replaceSensitiveData };
