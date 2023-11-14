import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import type { BasisTheoryElements } from './useBasisTheory';

type BasisTheoryProviderType = {
  bt?: BasisTheoryElements;
};

const BasisTheoryContext = createContext<BasisTheoryProviderType>({});

const BasisTheoryProvider = ({
  bt,
  children,
}: PropsWithChildren<BasisTheoryProviderType>): JSX.Element => {
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

const useBasisTheoryFromContext = (): BasisTheoryProviderType =>
  useContext(BasisTheoryContext);

export { BasisTheoryProvider, useBasisTheoryFromContext };
