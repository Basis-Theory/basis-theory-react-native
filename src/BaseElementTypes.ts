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

export type { InputBTRef, BTRef, Mask, InputBtDateRef, ValueSetter };
