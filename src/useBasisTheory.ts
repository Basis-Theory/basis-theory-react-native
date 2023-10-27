import type {
  BasisTheoryInitOptionsWithoutElements,
  BasisTheory as BasisTheoryType,
} from '@basis-theory/basis-theory-js/types/sdk';
import { useEffect, useState } from 'react';
import { BasisTheory } from '@basis-theory/basis-theory-js';

import { Proxy } from './modules/proxy';
import { Sessions } from './modules/sessions';
import { Tokens } from './modules/tokens';
import { useBasisTheoryFromContext } from './BasisTheoryProvider';

const _BasisTheoryElements = async ({ apiKey }: { apiKey: string }) => {
  let bt: BasisTheoryType = await new BasisTheory().init(apiKey);

  const proxy = Proxy(bt);

  const sessions = Sessions(bt);

  const tokens = Tokens(bt);

  return {
    sessions,
    tokens,
    proxy,
  };
};

export type BasisTheoryElements = Awaited<
  ReturnType<typeof _BasisTheoryElements>
>;

type UseBasisTheory = {
  error?: Error;
  bt?: BasisTheoryElements;
};

const useBasisTheory = (
  apiKey?: string,
  options?: BasisTheoryInitOptionsWithoutElements
): UseBasisTheory => {
  const [state, setState] = useState<UseBasisTheory>({});

  const { bt } = useBasisTheoryFromContext();

  useEffect(() => {
    (async () => {
      if (!state.bt && apiKey && !state.error) {
        try {
          const bt = await _BasisTheoryElements({ apiKey });

          setState({
            bt,
          });
        } catch (error) {
          setState({
            error: error as Error,
          });
        }
      }
    })();
  }, [state, apiKey, options]);

  if (state.bt || state.error) {
    return {
      bt: state.bt,
      error: state.error,
    };
  }

  return {
    bt,
  };
};

export { useBasisTheory };
