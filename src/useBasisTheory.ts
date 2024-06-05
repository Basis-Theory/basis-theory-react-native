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
import { logger } from './utils/logging';

const _BasisTheoryElements = async ({
  apiKey,
  apiBaseUrl,
}: BasisTheoryInitOptionsWithoutElements & { apiKey: string }) => {
  const bt: BasisTheoryType = await new BasisTheory().init(
    apiKey,
    apiBaseUrl ? { apiBaseUrl } : undefined
  );

  const proxy = Proxy(bt);

  const sessions = Sessions(bt);

  const tokens = Tokens(bt);

  return {
    sessions,
    tokens,
    proxy,
  };
};

type BasisTheoryElements = Awaited<ReturnType<typeof _BasisTheoryElements>>;

type UseBasisTheory = {
  error?: Error;
  bt?: BasisTheoryElements;
};

const useBasisTheory = (
  apiKey: string,
  options?: BasisTheoryInitOptionsWithoutElements
): UseBasisTheory => {
  const [state, setState] = useState<UseBasisTheory>({});

  const { bt } = useBasisTheoryFromContext();

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.error('Please enter a valid API key');
  }

  useEffect(() => {
    (async () => {
      if (!state.bt && apiKey && !state.error) {
        try {
          const bt = await _BasisTheoryElements({ apiKey, ...options });

          await logger.log.info('Succesfully initialized Elements');

          setState({
            bt,
          });
        } catch (error) {
          await logger.log.error(
            'Error while initializing Elements',
            error as Error
          );

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

export { useBasisTheory, type BasisTheoryElements };
