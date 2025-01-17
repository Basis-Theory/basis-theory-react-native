import type {
  CreateToken,
  UpdateToken,
  Token,
  TokenizeData as _TokenizeData,
} from '@basis-theory/basis-theory-js/types/models';
import type {
  BasisTheory as BasisTheoryType,
  RequestOptions,
} from '@basis-theory/basis-theory-js/types/sdk';
import type {
  BTRef,
  InputBTRefWithDatepart,
  PrimitiveType,
} from '../BaseElementTypes';
import { _elementErrors } from '../ElementValues';
import {
  replaceElementRefs,
  replaceSensitiveData,
} from '../utils/dataManipulationUtils';
import { isNilOrEmpty } from '../utils/shared';

export type CreateTokenWithBtRef = Omit<CreateToken, 'data'> & {
  data: Record<string, BTRef | InputBTRefWithDatepart | null | undefined>;
};

export type UpdateTokenWithBtRef = Omit<UpdateToken, 'data'> & {
  data: Record<
    string,
    BTRef | InputBTRefWithDatepart | string | null | undefined
  >;
};

export type TokenizeData = _TokenizeData<
  BTRef | InputBTRefWithDatepart | PrimitiveType
>;

export const Tokens = (bt: BasisTheoryType) => {
  const getTokenById = async <T>(id: string, apiKey?: string) => {
    try {
      const _token = await bt.tokens.retrieve(id, {
        apiKey,
      });

      const token = replaceSensitiveData(_token) as Token<T>;

      return token;
    } catch (error) {
      console.error(error);
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

      return token;
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (
    tokenId: string,
    tokenWithRef: UpdateTokenWithBtRef,
    requestOptions?: RequestOptions
  ) => {
    if (!isNilOrEmpty(_elementErrors)) {
      throw new Error(
        'Unable to create token. Payload contains invalid values. Review elements events for more details.'
      );
    }

    try {
      const _token = replaceElementRefs<UpdateToken>(tokenWithRef);

      const token = await bt.tokens.update(tokenId, _token, requestOptions);

      return token;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteToken = async (id: string) => {
    try {
      if (id) {
        await bt.tokens.delete(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tokenize = async (data: TokenizeData) => {
    try {
      if (data) {
        const _token = replaceElementRefs<_TokenizeData>(data);

        return await bt.tokenize(_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    /** @deprecated use `bt.tokens.retrieve` instead */
    getById: getTokenById,
    retrieve: getTokenById,
    create,
    update,
    delete: deleteToken,
    tokenize,
  };
};
