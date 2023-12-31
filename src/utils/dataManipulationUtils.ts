import { assoc, cond, identity, isNil, map, mapObjIndexed } from 'ramda';
import uuid from 'react-native-uuid';
import type { PrimitiveType } from '../BaseElementTypes';
import { _elementValues } from '../ElementValues';
import { isObject, isPrimitive, isToken, isBtRef, isBtDateRef } from './shared';

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
      (val) =>
        val.datepart === 'month'
          ? (_elementValues[val.id] as string).split('/')[0]
          : `20${(_elementValues[val.id] as string).split('/')[1]}`,
    ],
    [isBtRef, (val) => (_elementValues as Record<string, unknown>)[val.id]],
    [Array.isArray, map(replaceElementRefs)],
    [isObject, mapObjIndexed(replaceElementRefs)],
    [isPrimitive, identity],
  ])(val) as T;

export { replaceElementRefs, replaceSensitiveData };
