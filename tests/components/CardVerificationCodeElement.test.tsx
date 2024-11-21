/**
 * @format
 */

import 'react-native';
import React from 'react';
import { CardVerificationCodeElement } from '../../src/components/CardVerificationCodeElement';

import { render, fireEvent, screen } from '@testing-library/react-native';

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
    test.each([3, 4])(
      'applies mask correctly with cvcLength = %d',
      (cvcLength) => {
        render(
          <CardVerificationCodeElement
            btRef={mockedRef}
            placeholder="CVC"
            cvcLength={cvcLength}
            style={{}}
          />
        );

        const el = screen.getByPlaceholderText('CVC');

        fireEvent.changeText(el, '12345');

        const expectedValue = cvcLength === 3 ? '123' : '1234';

        expect(el.props.value).toStrictEqual(expectedValue);
      }
    );
  });

  describe('Validation and Change Events', () => {
    test.each([
      [
        'should error: incomplete',
        '1',
        {
          complete: false,
          empty: false,
          errors: [{ targetId: 'cvc', type: 'incomplete' }],
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
        '123',
        {
          complete: true,
          maskSatisfied: true,
          valid: true,
          empty: false,
        },
        '123',
      ],
    ])('input: %s', (_, inputValue, expectedEvent, expectedValue) => {
      const onChange = jest.fn();

      render(
        <CardVerificationCodeElement
          btRef={mockedRef}
          placeholder="CVC"
          cvcLength={3}
          style={{}}
          onChange={onChange}
        />
      );

      const el = screen.getByPlaceholderText('CVC');

      fireEvent.changeText(el, inputValue);

      expect(el.props.value).toStrictEqual(expectedValue);
      expect(onChange).toHaveBeenCalledWith(expectedEvent);
    });
  });
});
