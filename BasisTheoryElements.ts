import type {
  CreateToken,
  Token,
} from '@basis-theory/basis-theory-js/types/models';
import {BasisTheory} from '@basis-theory/basis-theory-js';

export class BasisTheoryElements {
  public static apiKey: string = '';
  static #_elementValues: Record<string, string> = {};

  constructor() {}

  public static updateElementValue(elementId: string, value: string): void {
    BasisTheoryElements.#_elementValues[elementId] = value;
  }

  public static async createToken(
    body: CreateToken,
    apiKey: string | undefined,
  ): Promise<Token> {
    let apiKeyForRequest = apiKey;

    if (!apiKeyForRequest) {
      apiKeyForRequest = BasisTheoryElements.apiKey;
    }

    const bt = await new BasisTheory();

    // TODO: need to iterate through the body and replace any elementIds with the values from the registry
    // check if any value in the data of body is of type BTRef or BTDateRef (may need to convert these
    // refs to classes and check instance of)

    return bt.tokens.create(body, {
      apiKey: apiKeyForRequest,
    });
  }
}
