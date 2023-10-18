/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react-native';
import { CardNumberElement } from '../../src';

describe('CardNumberElement', () => {
  const mockedRef = {
    current: {
      id: '123',
      format: () => '',
      clear: () => {},
      setValue: () => {},
      focus: () => {},
      blur: () => {},
    },
  };

  describe('mask', () => {
    test('works', () => {
      render(
        <CardNumberElement
          btRef={mockedRef}
          placeholder="Card Number"
          style={{}}
        />
      );

      const el = screen.getByPlaceholderText('Card Number');

      fireEvent.changeText(el, '4242424242424242');

      expect(el.props.value).toStrictEqual('4242 4242 4242 4242');
    });
  });

  describe('Validation', () => {
    describe('CVC validation', () => {
      test.each([
        [
          'should error',
          '4',
          {
            complete: false,
            empty: false,
            errors: [{ targetId: 'cardNumber', type: 'incomplete' }],
            maskSatisfied: false,
            valid: false,
          },
          '4',
        ],
        [
          'prevents addition of chars that do not belong to the mask',
          '#####',
          {
            complete: false,
            empty: true,
            maskSatisfied: false,
            valid: false,
          },
          '',
        ],
        [
          `shouldn't error`,
          '4242424242424242',
          {
            complete: true,
            maskSatisfied: true,
            valid: true,
            empty: false,
          },
          '4242 4242 4242 4242',
        ],
        [
          `shouldn't error2`,
          '4242424242424242424',
          {
            complete: true,
            maskSatisfied: true,
            valid: true,
            empty: false,
          },
          '4242 4242 4242 4242424',
        ],
      ])('input: %s', (_, inputValue, expectedEvent, expectedValue) => {
        const onChange = jest.fn();

        render(
          <CardNumberElement
            btRef={mockedRef}
            placeholder="Card Number"
            style={{}}
            onChange={onChange}
          />
        );

        const el = screen.getByPlaceholderText('Card Number');

        fireEvent.changeText(el, inputValue);

        expect(el.props.value).toStrictEqual(expectedValue);
        expect(onChange).toHaveBeenCalledWith(expectedEvent);
      });
    });
  });
});
