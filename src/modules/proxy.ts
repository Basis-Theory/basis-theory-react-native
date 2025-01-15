import type { BasisTheory } from '@basis-theory/basis-theory-js';
import type {
  ProxyRequestOptions,
  BasisTheory as BasisTheoryType,
} from '@basis-theory/basis-theory-js/types/sdk';

import { replaceSensitiveData } from '../utils/dataManipulationUtils';

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

      return result;
    } catch (error) {
      console.error(error);
    }
  };

  return proxy;
};
