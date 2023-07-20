interface CommonBTRefFunctions {
  clear: () => void;
  focus: () => void;
  blur: () => void;
}

interface BTRefBase {
  id: string;
  format: (plaintextValue: string) => string;
}

type BTRef = BTRefBase & CommonBTRefFunctions;

export type { BTRefBase, BTRef };
