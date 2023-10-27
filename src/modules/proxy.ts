import { BasisTheory } from '@basis-theory/basis-theory-js';
import { ProxyRequestOptions } from '@basis-theory/basis-theory-js/types/sdk';

import type { BasisTheory as BasisTheoryType } from '@basis-theory/basis-theory-js/types/sdk';
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
    proxyRequest.apiKey = apiKey;
    const proxyResponse = await bt.proxy[method](proxyRequest);
    const result = replaceSensitiveData(proxyResponse);

    return result;
  };

  return proxy;
};
