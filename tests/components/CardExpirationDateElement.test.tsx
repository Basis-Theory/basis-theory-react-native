/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react-native';
import { CardExpirationDateElement } from '../../src';

describe('CardVerificationCodeElement', () => {
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
        <CardExpirationDateElement
          btRef={mockedRef}
          placeholder="Expiration Date"
          style={{}}
        />
      );

      const el = screen.getByPlaceholderText('Expiration Date');

      fireEvent.changeText(el, '1234');

      expect(el.props.value).toStrictEqual('12/34');
    });
  });

  describe('Validation', () => {
    describe('CVC validation', () => {
      test.each([
        [
          'should error',
          '1',
          {
            complete: false,
            empty: false,
            errors: [{ targetId: 'expirationDate', type: 'incomplete' }],
            maskSatisfied: false,
            valid: false,
          },
          '1',
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
          '1234',
          {
            complete: true,
            maskSatisfied: true,
            valid: true,
            empty: false,
          },
          '12/34',
        ],
      ])('input: %s', (_, inputValue, expectedEvent, expectedValue) => {
        const onChange = jest.fn();

        render(
          <CardExpirationDateElement
            btRef={mockedRef}
            placeholder="Expiration Date"
            style={{}}
            onChange={onChange}
          />
        );

        const el = screen.getByPlaceholderText('Expiration Date');

        fireEvent.changeText(el, inputValue);

        expect(el.props.value).toStrictEqual(expectedValue);
        expect(onChange).toHaveBeenCalledWith(expectedEvent);
      });
    });
  });
});
