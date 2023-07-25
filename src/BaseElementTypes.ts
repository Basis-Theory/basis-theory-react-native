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

export type { InputBTRef, BTRef };
