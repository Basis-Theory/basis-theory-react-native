interface CommonBTRefFunctions {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  setValue: (inputBTRef: InputBTRef) => void;
}

interface InputBTRef {
  id: string;
  format: (plaintextValue: string) => string;
}

type BTRef = InputBTRef & CommonBTRefFunctions;

type Mask = (RegExp | string)[];

export type { InputBTRef, BTRef, Mask };
