import type {
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
import { logger } from '../utils/logging';
import { _elementErrors } from '../ElementValues';
import { isNilOrEmpty } from '../utils/shared';

export type CreateTokenWithBtRef = Omit<CreateToken, 'data'> & {
  data: TokenData<BTRef>;
};

export const Tokens = (bt: BasisTheoryType) => {
  const getTokenById = async <T extends unknown>(
    id: string,
    apiKey?: string
  ) => {
    try {
      const _token = await bt.tokens.retrieve(id, {
        apiKey,
      });

      const token = replaceSensitiveData(_token) as Token<T>;

      logger.log.info('Token retrieved');

      return Promise.resolve(token);
    } catch (error) {
      logger.log.error('Error while retrieving Token', error as Error);
    }
  };

  const create = async (
    tokenWithRef: CreateTokenWithBtRef,
    requestOptions?: RequestOptions
  ) => {
    if (!isNilOrEmpty(_elementErrors)) {
      return Promise.reject(
        new Error(
          'Unable to create token. Payload contains invalid values. Review elements events for more details.'
        )
      );
    }

    try {
      const _token = replaceElementRefs(tokenWithRef);

      const token = await bt.tokens.create(
        _token as CreateToken,
        requestOptions
      );

      logger.log.info('Token created');

      return token;
    } catch (error) {
      logger.log.error('Error while creating Token', error as Error);
    }
  };

  return {
    getById: getTokenById,
    create,
  };
};
