import { _elementErrors, _elementValues } from '../../src/ElementValues';
import { CreateTokenWithBtRef, Tokens } from '../../src/modules/tokens';
import type { BasisTheory as BasisTheoryType } from '@basis-theory/basis-theory-js/types/sdk';

describe('tokens', () => {
  beforeEach(() => {
    //@ts-ignore
    _elementValues = {
      '123': 'my very sensitive value',
      '456': 'my other very sensitive value',
      firstArrayElement: 'first sensitive element in array',
      secondArrayElement: 'second sensitive element in array',
    };
    //@ts-ignore
    _elementErrors = {};
  });
  afterAll(() => {
    //@ts-ignore
    _elementValues = {};
    //@ts-ignore
    _elementErrors = {};
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
});

describe('tokens - Validation', () => {
  test('throws if there are any validation errors', () => {
    //@ts-ignore
    _elementErrors = {
      secondArrayElement: 'incomplete',
    };

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
