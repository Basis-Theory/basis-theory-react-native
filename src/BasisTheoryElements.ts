import type {
  BasisTheory as BasisTheoryType,
  CreateSessionResponse,
} from '@basis-theory/basis-theory-js/types/sdk';
import { BasisTheory } from '@basis-theory/basis-theory-js';
import { Token, TokenData } from '@basis-theory/basis-theory-js/types/models';
import { _elementValues } from './ElementValues';
import uuid from 'react-native-uuid';
import { InputBTRef } from './BaseElementTypes';
import set from 'lodash.set';

export class BasisTheoryElements {
  public static apiKey: string = '';
  static #btInstance: BasisTheoryType;

  constructor() {}

  public static async createSession(
    apiKey?: string
  ): Promise<CreateSessionResponse> {
    const btInstance = await BasisTheoryElements.getBtInstance(apiKey);

    return btInstance.sessions.create();
  }

  public static async getTokenById(
    id: string,
    apiKey?: string
  ): Promise<Token<unknown>> {
    const btInstance = await BasisTheoryElements.getBtInstance(apiKey);

    const token = await btInstance.tokens.retrieve(id, {
      apiKey: BasisTheoryElements.getApiKey(apiKey),
    });

    const result = BasisTheoryElements.replaceTokenData({ data: token.data });

    token.data = result.data as TokenData;

    return Promise.resolve(token);
  }

  private static replaceTokenData(
    token: Record<string, unknown>,
    result: Record<string, unknown> = {},
    parentObject: unknown = undefined
  ): Record<string, unknown> {
    Object.entries(token).forEach(([key, value]) => {
      const tokenDataPath = BasisTheoryElements.resolvePath(
        token,
        key,
        parentObject
      );

      if (BasisTheoryElements.isValueAPrimitive(value)) {
        const id = uuid.v4() as string;

        _elementValues[id] = value;
        const btRefBase: InputBTRef = {
          id: id,
          format: (plaintextValue) => plaintextValue,
        };

        result = set(
          (result as Record<string, unknown>) || {},
          tokenDataPath,
          btRefBase
        );
      } else if (typeof value === 'object') {
        if (Array.isArray(value) && value.length === 0) {
          result = set(
            (result as Record<string, unknown>) || {},
            tokenDataPath,
            []
          );
        } else {
          BasisTheoryElements.replaceTokenData(
            value as Record<string, unknown>,
            result,
            tokenDataPath
          );
        }
      }
    });

    return result;
  }

  private static async getBtInstance(
    apiKey?: string
  ): Promise<BasisTheoryType> {
    if (!BasisTheoryElements.#btInstance) {
      BasisTheoryElements.#btInstance = await new BasisTheory().init(
        BasisTheoryElements.getApiKey(apiKey)
      );
    }

    return BasisTheoryElements.#btInstance;
  }

  private static resolvePath(
    token: unknown,
    key: string,
    parentObject?: unknown
  ): string {
    if (parentObject) {
      if (Array.isArray(token)) {
        return `${parentObject}[${key}]`;
      }

      return `${parentObject}.${key}`;
    }

    return key;
  }

  private static isValueAPrimitive = (value: unknown): boolean =>
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'undefined' ||
    value === null;

  private static getApiKey(apiKey?: string): string {
    return apiKey || BasisTheoryElements.apiKey;
  }
}
