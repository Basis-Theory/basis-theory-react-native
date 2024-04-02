import { Token } from '@basis-theory/basis-theory-js/types/models';
import { BTRef } from '../../src';
import * as state from '../../src/ElementValues';
import {
  replaceElementRefs,
  replaceSensitiveData,
} from '../../src/utils/dataManipulationUtils';

/* hard codes id for replaceSensitiveData, this will keep the same ID for all tests
 * and the replaceSensitiveData function will rewrite the same property on _elementValues
 * does not feel ideal but we have to deal with uuid.v4() somehow
 */

jest.mock('react-native-uuid', () => ({
  v4: () => 'myVeryUniqueId',
}));

describe('replace element refs', () => {
  afterAll(() => {
    //@ts-ignore
    state._elementValues = {};
  });
  test('replaces refs with proper values', () => {
    //@ts-ignore
    state._elementValues = {
      '123': 'my very sensitive value',
      '456': 'my other very sensitive value',
      expirationMonth: '12/25',
      expirationYear: '12/25',
      firstArrayElement: 'first sensitive element in array',
      secondArrayElement: 'second sensitive element in array',
    };

    const tokenWithRef = {
      id: 'tokenID',
      type: 'card',
      data: {
        number: { id: '123', format: jest.fn },
        expiration_month: { id: 'expirationMonth', datepart: 'month' },
        expiration_year: { id: 'expirationYear', datepart: 'year' },
        nestedObject: {
          test: { id: '456', format: jest.fn },
        },
        myArray: [
          { id: 'firstArrayElement', format: jest.fn },
          { id: 'secondArrayElement', format: jest.fn },
        ],
      },
    };

    const expectedResult = {
      id: 'tokenID',
      type: 'card',
      data: {
        number: 'my very sensitive value',
        expiration_month: '12',
        expiration_year: '2025',
        nestedObject: {
          test: 'my other very sensitive value',
        },
        myArray: [
          'first sensitive element in array',
          'second sensitive element in array',
        ],
      },
    };

    const result = replaceElementRefs(tokenWithRef);

    expect(result).toStrictEqual(expectedResult);
  });

  describe('Partial token updates', () => {
    afterEach(() => {
      //@ts-ignore
      state._elementValues = {};
    });

    const testCases = [
      {
        description: 'handles undefined/empty date values in state',
        stateValues: {
          '123': '4242424242424242',
        },
        expectedData: {
          number: '4242424242424242',
        },
      },
      {
        description: 'handles missing card number values in state',
        stateValues: {
          date: '12/25',
        },
        expectedData: {
          expiration_month: '12',
          expiration_year: '2025',
        },
      },
      {
        description: 'handles undefined values in state',
        stateValues: {
          date: undefined,
          number: undefined,
        },
        expectedData: {},
      },
    ];

    test.each(testCases)('$description', ({ stateValues, expectedData }) => {
      //@ts-ignore
      state._elementValues = stateValues;

      const tokenWithRef = {
        id: 'tokenID',
        type: 'card',
        data: {
          number: { id: '123', format: jest.fn },
          expiration_month: { id: 'date', datepart: 'month' },
          expiration_year: { id: 'date', datepart: 'year' },
        },
      };

      expect(replaceElementRefs(tokenWithRef)).toEqual({
        data: expectedData,
        id: 'tokenID',
        type: 'card',
      });
    });

    test('handles undefined element refs', () => {
      //@ts-ignore
      state._elementValues = {
        date: '12/25',
        number: '4242424242424242',
      };

      const tokenWithRef = {
        id: 'tokenID',
        type: 'card',
        data: {
          number: undefined,
          expiration_month: undefined,
          expiration_year: { id: 'date', datepart: 'year' },
        },
      };

      expect(replaceElementRefs(tokenWithRef)).toEqual({
        data: { expiration_year: '2025' },
        id: 'tokenID',
        type: 'card',
      });
    });
  });
});

describe('replace sensitive data', () => {
  test('replaces values in data when value is object', () => {
    const token = {
      type: 'token',
      enrichments: { token: '123' },
      data: {
        number: '4242424242424241',
      },
    };

    const result = replaceSensitiveData(token) as Token<{ number: BTRef }>;

    expect((result.data as { number: BTRef }).number?.id).toStrictEqual(
      'myVeryUniqueId'
    );
    expect(state._elementValues.myVeryUniqueId).toStrictEqual(
      '4242424242424241'
    );
  });

  test('replaces values in data when value is object recursively', () => {
    const token = {
      type: 'token',
      enrichments: { token: '123' },
      data: {
        card: { number: '4242424242424242' },
      },
    };

    const result = replaceSensitiveData(token) as Token<{ number: BTRef }>;

    expect(
      (result.data as { card: { number: BTRef } }).card?.number.id
    ).toStrictEqual('myVeryUniqueId');
    expect(state._elementValues.myVeryUniqueId).toStrictEqual(
      '4242424242424242'
    );
  });

  test('replaces values in data when value is array', () => {
    const token = {
      type: 'token',
      enrichments: { token: '123' },
      data: ['4242424242424243'],
    };

    const result = replaceSensitiveData(token) as Token<{ number: BTRef }>;

    expect((result.data as unknown as BTRef[])[0].id).toStrictEqual(
      'myVeryUniqueId'
    );

    expect(state._elementValues.myVeryUniqueId).toStrictEqual(
      '4242424242424243'
    );
  });

  test('replaces values in data when value is array recursively', () => {
    const token = {
      type: 'token',
      enrichments: { token: '123' },
      data: [{ card: { number: '4242424242424244' } }],
    };

    const result = replaceSensitiveData(token) as Token<{ number: BTRef }>;

    expect(
      (result.data as unknown as { card: { number: BTRef } }[])[0].card.number
        .id
    ).toStrictEqual('myVeryUniqueId');

    expect(state._elementValues.myVeryUniqueId).toStrictEqual(
      '4242424242424244'
    );
  });

  test('replaces values in data when value is string', () => {
    const token = {
      type: 'token',
      enrichments: { token: '123' },
      data: '4242424242424245',
    };

    const result = replaceSensitiveData(token) as Token<{ number: BTRef }>;

    expect((result.data as unknown as BTRef).id).toStrictEqual(
      'myVeryUniqueId'
    );

    expect(state._elementValues.myVeryUniqueId).toStrictEqual(
      '4242424242424245'
    );
  });
});
