import { _elementErrors, _elementValues } from '../../src/ElementValues';
import {
  CreateTokenWithBtRef,
  TokenizeData,
  Tokens,
} from '../../src/modules/tokens';
import type { BasisTheory as BasisTheoryType } from '@basis-theory/basis-theory-js/types/sdk';

jest.mock('../../src/ElementValues', () => ({
  _elementValues: {},
  _elementErrors: {},
}));

describe('tokens', () => {
  beforeEach(() => {
    Object.assign(_elementValues, {
      '123': 'my very sensitive value',
      '456': 'my other very sensitive value',
      firstArrayElement: 'first sensitive element in array',
      secondArrayElement: 'second sensitive element in array',
      expirationDate: '12/23',
    });

    Object.assign(_elementErrors, {});
  });
  afterAll(() => {
    Object.keys(_elementValues).forEach((key) => delete _elementValues[key]);
    Object.keys(_elementErrors).forEach((key) => delete _elementErrors[key]);
  });

  test('calls bt tokens create', async () => {
    const mockCreate = jest.fn();
    const tokens = Tokens({
      tokens: { create: mockCreate },
    } as unknown as BasisTheoryType);

    const tokenWithRef = {
      id: 'tokenID',
      type: 'card',
      data: {
        number: { id: '123', format: jest.fn() },
        nestedObject: {
          test: { id: '456', format: jest.fn() },
        },
        myArray: [
          { id: 'firstArrayElement', format: jest.fn() },
          { id: 'secondArrayElement', format: jest.fn() },
        ],
      },
    } as unknown as CreateTokenWithBtRef;

    const expectedResult = {
      id: 'tokenID',
      type: 'card',
      data: {
        number: 'my very sensitive value',
        nestedObject: {
          test: 'my other very sensitive value',
        },
        myArray: [
          'first sensitive element in array',
          'second sensitive element in array',
        ],
      },
    };

    await tokens.create(tokenWithRef);

    expect(mockCreate).toHaveBeenCalledWith(expectedResult, undefined);
  });

  test('calls bt tokens tokenize', async () => {
    const mockTokenize = jest.fn();
    const tokens = Tokens({
      tokenize: mockTokenize,
    } as unknown as BasisTheoryType);

    const tokenizeDataWithRef = {
      card: {
        id: 'tokenID',
        type: 'card',
        data: {
          number: { id: '123', format: jest.fn() },
          nestedObject: {
            test: { id: '456', format: jest.fn() },
          },
          myArray: [
            { id: 'firstArrayElement', format: jest.fn() },
            { id: 'secondArrayElement', format: jest.fn() },
          ],
        },
      },
    } as unknown as TokenizeData;

    const expectedResult = {
      card: {
        id: 'tokenID',
        type: 'card',
        data: {
          number: 'my very sensitive value',
          nestedObject: {
            test: 'my other very sensitive value',
          },
          myArray: [
            'first sensitive element in array',
            'second sensitive element in array',
          ],
        },
      },
    };

    await tokens.tokenize(tokenizeDataWithRef);

    expect(mockTokenize).toHaveBeenCalledWith(expectedResult);
  });

  test('calls bt tokens update', async () => {
    const mockUpdate = jest.fn();
    const tokens = Tokens({
      tokens: { update: mockUpdate },
    } as unknown as BasisTheoryType);

    const tokenWithRef = {
      data: {
        number: { id: '123', format: jest.fn() },
        expiration_year: { id: 'expirationDate', datepart: 'year' },
        expiration_month: { id: 'expirationDate', datepart: 'month' },
      },
    } as unknown as CreateTokenWithBtRef;

    const expectedResult = {
      data: {
        number: 'my very sensitive value',
        expiration_year: '2023',
        expiration_month: '12',
      },
    };

    await tokens.update('tokenID', tokenWithRef);

    expect(mockUpdate).toHaveBeenCalledWith(
      'tokenID',
      expectedResult,
      undefined
    );
  });
});

test('calls bt tokens delete', async () => {
  const mockDelete = jest.fn();
  const tokens = Tokens({
    tokens: { delete: mockDelete },
  } as unknown as BasisTheoryType);

  await tokens.delete('tokenID');

  expect(mockDelete).toHaveBeenCalledWith('tokenID');
});

describe('tokens - Validation', () => {
  test('throws if there are any validation errors', () => {
    Object.assign(_elementErrors, {
      secondArrayElement: 'incomplete',
    });

    const tokens = Tokens({} as BasisTheoryType);

    const tokenWithRef = {
      id: 'tokenID',
      type: 'card',
      data: {
        number: { id: '123', format: jest.fn() },
        nestedObject: {
          test: { id: '456', format: jest.fn },
        },
        myArray: [
          { id: 'firstArrayElement', format: jest.fn() },
          { id: 'secondArrayElement', format: jest.fn() },
        ],
      },
    } as unknown as CreateTokenWithBtRef;

    const action = async () => {
      await tokens.create(tokenWithRef);
    };

    expect(() => action()).rejects.toThrow(
      'Unable to create token. Payload contains invalid values. Review elements events for more details.'
    );
  });
});
