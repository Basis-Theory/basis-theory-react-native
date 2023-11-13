import type {
  CreateToken,
  Token,
} from '@basis-theory/basis-theory-js/types/models';
import type {
  BasisTheory as BasisTheoryType,
  RequestOptions,
} from '@basis-theory/basis-theory-js/types/sdk';
import type { BTRef, InputBTRefWithDatepart } from '../BaseElementTypes';
import { _elementErrors } from '../ElementValues';
import {
  replaceElementRefs,
  replaceSensitiveData,
} from '../utils/dataManipulationUtils';
import { logger } from '../utils/logging';
import { isNilOrEmpty } from '../utils/shared';

export type CreateTokenWithBtRef = Omit<CreateToken, 'data'> & {
  data: Record<string, BTRef | InputBTRefWithDatepart | null | undefined>;
};

export const Tokens = (bt: BasisTheoryType) => {
  const getTokenById = async <T>(id: string, apiKey?: string) => {
    try {
      const _token = await bt.tokens.retrieve(id, {
        apiKey,
      });

      const token = replaceSensitiveData(_token) as Token<T>;

      await logger.log.info('Token retrieved');

      return token;
    } catch (error) {
      await logger.log.error('Error while retrieving Token', error as Error);
    }
  };

  const create = async (
    tokenWithRef: CreateTokenWithBtRef,
    requestOptions?: RequestOptions
  ) => {
    if (!isNilOrEmpty(_elementErrors)) {
      throw new Error(
        'Unable to create token. Payload contains invalid values. Review elements events for more details.'
      );
    }

    try {
      const _token = replaceElementRefs<CreateToken>(tokenWithRef);

      const token = await bt.tokens.create(_token, requestOptions);

      await logger.log.info('Token created');

      return token;
    } catch (error) {
      await logger.log.error('Error while creating Token', error as Error);
    }
  };

  return {
    getById: getTokenById,
    create,
  };
};
