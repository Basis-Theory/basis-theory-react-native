interface CommonBTRefFunctions {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  setValue: ValueSetter;
}

interface InputBTRef {
  id: string;
  format: (plaintextValue: string) => string;
}

type InputBtDateRef = {
  year: InputBTRef;
  month: InputBTRef;
};

type ValueSetter = (val: InputBTRef | InputBtDateRef | undefined) => void;

type BTRef = InputBTRef & CommonBTRefFunctions;

type Mask = (RegExp | string)[];

export enum ElementType {
  CARD_NUMBER = 'cardNumber',
  EXPIRATION_DATE = 'expirationDate',
  CVC = 'cvc',
  TEXT = 'text',
}

type PrimitiveType = string | boolean | number | undefined | null;

export type {
  BTRef,
  InputBTRef,
  InputBtDateRef,
  Mask,
  PrimitiveType,
  ValueSetter,
};
