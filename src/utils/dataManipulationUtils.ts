import {
  anyPass,
  assoc,
  cond,
  equals,
  identity,
  is,
  isNil,
  map,
  mapObjIndexed,
  type,
} from 'ramda';
import uuid from 'react-native-uuid';
import type { BTRef, PrimitiveType } from '../BaseElementTypes';
import { Token } from '@basis-theory/basis-theory-js/types/models';
import { _elementValues } from '../ElementValues';

const isObject = (val: unknown): val is Record<string, unknown> =>
  equals('Object', type(val));

const isToken = (val: unknown): val is Token =>
  !isNil((val as Token).data) && !isNil((val as Token).type);

const isBtRef = (val: unknown): val is BTRef =>
  !isNil(_elementValues[(val as BTRef).id]);

const isPrimitive = anyPass([is(String), is(Boolean), is(Number), isNil]);

const createBtInputRef = (val: PrimitiveType) => {
  if (isNil(val)) return null;

  const id = uuid.v4().toString();
  _elementValues[id] = val;

  return {
    id,
    format: (plaintextValue: string) => plaintextValue,
  };
};

export const replaceSensitiveData = (val: unknown): unknown =>
  cond([
    [isToken, (val) => assoc('data', replaceSensitiveData(val.data), val)],
    [isPrimitive, createBtInputRef],
    [isObject, mapObjIndexed(replaceSensitiveData)],
    [Array.isArray, map(replaceSensitiveData)],
  ])(val);

export const replaceElementRefs = (val: unknown): unknown =>
  cond([
    // this one should always be evaluated first and ramda doesn't like _elementValues types when using recursion & identity
    [isBtRef, (val) => (_elementValues as Record<string, unknown>)[val.id]],
    [Array.isArray, map(replaceElementRefs)],
    [isObject, mapObjIndexed(replaceElementRefs)],
    [isPrimitive, identity],
  ])(val);
