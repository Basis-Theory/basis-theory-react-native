type CommonBTRefFunctions = {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  setValue: ValueSetter;
};

type InputBTRef = {
  id: string;
  format: (plaintextValue: string) => string;
};

type InputBTRefWithDatepart = InputBTRef & {
  datepart: 'month' | 'year';
};

type InputBtDateRef = InputBTRef & {
  year: () => InputBTRefWithDatepart;
  month: () => InputBTRefWithDatepart;
};

type InputBtDateRefReveal = {
  year: InputBTRef;
  month: InputBTRef;
};

type ValueSetter = (val: InputBtDateRefReveal | InputBTRef | undefined) => void;

type BTRef = CommonBTRefFunctions & InputBTRef;

type BTDateRef = CommonBTRefFunctions & InputBtDateRef;

type Mask = (RegExp | string)[];

enum ElementType {
  CARD_NUMBER = 'cardNumber',
  EXPIRATION_DATE = 'expirationDate',
  CVC = 'cvc',
  TEXT = 'text',
}

type PrimitiveType = boolean | number | string | null | undefined;

type ValidationResult = 'incomplete' | 'invalid' | undefined;

export { ElementType };
export type {
  BTDateRef,
  BTRef,
  InputBtDateRef,
  InputBtDateRefReveal,
  InputBTRef,
  InputBTRefWithDatepart,
  Mask,
  PrimitiveType,
  ValidationResult,
  ValueSetter,
};
