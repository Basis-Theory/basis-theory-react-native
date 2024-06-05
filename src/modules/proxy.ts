import type { BasisTheory } from '@basis-theory/basis-theory-js';
import type {
  ProxyRequestOptions,
  BasisTheory as BasisTheoryType,
} from '@basis-theory/basis-theory-js/types/sdk';

import { replaceSensitiveData } from '../utils/dataManipulationUtils';
import { logger } from '../utils/logging';

export const Proxy = (bt: BasisTheoryType) => {
  const proxy = async (
    {
      method,
      ...proxyRequest
    }: Omit<ProxyRequestOptions, 'includeResponseHeaders'> & {
      method: keyof BasisTheory['proxy'];
    },
    apiKey?: string
  ): Promise<unknown> => {
    try {
      // eslint-disable-next-line no-param-reassign
      proxyRequest.apiKey = apiKey;
      const proxyResponse = await bt.proxy[method](proxyRequest);
      const result = replaceSensitiveData(proxyResponse);

      await logger.log.info('Succesfully invoked proxy');

      return result;
    } catch (error) {
      await logger.log.error('Error while invoking proxy', error as Error);
    }
  };

  return proxy;
};
