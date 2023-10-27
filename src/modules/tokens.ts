import {
  CreateToken,
  Token,
  TokenData,
} from '@basis-theory/basis-theory-js/types/models';
import { BTRef } from '../BaseElementTypes';
import {
  replaceElementRefs,
  replaceSensitiveData,
} from '../utils/dataManipulationUtils';

import type {
  BasisTheory as BasisTheoryType,
  RequestOptions,
} from '@basis-theory/basis-theory-js/types/sdk';

type CreateTokenWithBtRef = Omit<CreateToken, 'data'> & {
  data: TokenData<BTRef>;
};

export const Tokens = (bt: BasisTheoryType) => {
  const getTokenById = async <T extends unknown>(
    id: string,
    apiKey?: string
  ): Promise<Token<T>> => {
    const _token = await bt.tokens.retrieve(id, {
      apiKey,
    });

    const token = replaceSensitiveData(_token) as Token<T>;

    return Promise.resolve(token);
  };

  const create = async (
    tokenWithRef: CreateTokenWithBtRef,
    requestOptions?: RequestOptions
  ) => {
    try {
      const _token = replaceElementRefs(tokenWithRef);

      return await bt.tokens.create(_token as CreateToken, requestOptions);
    } catch (err) {
      console.error(JSON.stringify(err));
    }
  };

  return {
    getById: getTokenById,
    create,
  };
};
