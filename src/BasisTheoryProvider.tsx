import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { BasisTheoryElements } from './useBasisTheory';

interface BasisTheoryProvider {
  bt?: BasisTheoryElements;
}

const BasisTheoryContext = createContext<BasisTheoryProvider>({});

const BasisTheoryProvider = ({
  bt,
  children,
}: PropsWithChildren<BasisTheoryProvider>): JSX.Element => {
  const value = useMemo(
    () => ({
      bt,
    }),
    [bt]
  );

  return (
    <BasisTheoryContext.Provider value={value}>
      {children}
    </BasisTheoryContext.Provider>
  );
};

const useBasisTheoryFromContext = (): BasisTheoryProvider =>
  useContext(BasisTheoryContext);

export { BasisTheoryProvider, useBasisTheoryFromContext };
