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

type FieldError = {
  targetId: string;
  type: 'incomplete' | 'invalid';
};

type ElementEvent = {
  /**
   * `true` if the element is empty.
   */
  empty: boolean;
  /**
   * `true` if the input `valid` and `maskSatisfied` properties are `true`.
   */
  complete: boolean;
  /**
   * `true` if the input is valid according to validation for each element.
   * Defaults to `true` if no validation is defined for the element.
   */
  valid?: boolean;
  /**
   * `true` if the input satisfies the mask length requirements.
   * Defaults to `true` if no mask is provided.
   */
  maskSatisfied?: boolean;
  /**
   * Array of objects that indicates if an element is invalid or incomplete.
   */
  errors?: FieldError[];

  /**
   * Card brand identifier
   * Only present for card number elements
   */
  brand?:
    | string
    | 'american-express'
    | 'diners-club'
    | 'discover'
    | 'ebt'
    | 'elo'
    | 'hiper'
    | 'hipercard'
    | 'jcb'
    | 'maestro'
    | 'mastercard'
    | 'mir'
    | 'private-label'
    | 'proprietary'
    | 'unionpay'
    | 'visa';
  /**
   * Last 4 digits of the card number
   * Only present for card number elements
   */
  cardLast4?: string;
  /**
   * Required length of the CVC for the detected card brand
   * Only present for card number elements
   */
  cvcLength?: number;
  /**
   * Bank Identification Number (first 6-8 digits of card number)
   * Only present for card number elements
   */
  cardBin?: string;
};

type EventConsumer = (event: ElementEvent) => void;

interface EventConsumers {
  onBlur?: EventConsumer;
  onChange?: EventConsumer;
  onFocus?: EventConsumer;
}

type CreateEvent = (value: string) => ElementEvent;

export { ElementType };
export type {
  BTDateRef,
  BTRef,
  CreateEvent,
  ElementEvent,
  EventConsumers,
  InputBtDateRef,
  InputBtDateRefReveal,
  InputBTRef,
  InputBTRefWithDatepart,
  Mask,
  PrimitiveType,
  ValidationResult,
  ValueSetter,
};
