interface CommonBTRefFunctions {
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

interface BTRefBase {
  id: string;
  format: (plaintextValue: string) => string;
}

export type BTRef = BTRefBase & CommonBTRefFunctions;
