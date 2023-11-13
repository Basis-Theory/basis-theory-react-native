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

interface InputBTRefWithDatepart extends InputBTRef {
  datepart: 'year' | 'month';
}

interface InputBtDateRef extends InputBTRef {
  year: () => InputBTRefWithDatepart;
  month: () => InputBTRefWithDatepart;
}

type InputBtDateRefReveal = {
  year: InputBTRef;
  month: InputBTRef;
};

type ValueSetter = (val: InputBTRef | InputBtDateRefReveal | undefined) => void;

type BTRef = InputBTRef & CommonBTRefFunctions;
type BTDateRef = InputBtDateRef & CommonBTRefFunctions;

type Mask = (RegExp | string)[];

export enum ElementType {
  CARD_NUMBER = 'cardNumber',
  EXPIRATION_DATE = 'expirationDate',
  CVC = 'cvc',
  TEXT = 'text',
}

type PrimitiveType = string | boolean | number | undefined | null;

type ValidationResult = 'invalid' | 'incomplete' | undefined;

export type {
  BTRef,
  BTDateRef,
  InputBTRef,
  InputBtDateRef,
  InputBtDateRefReveal,
  InputBTRefWithDatepart,
  Mask,
  PrimitiveType,
  ValidationResult,
  ValueSetter,
};
