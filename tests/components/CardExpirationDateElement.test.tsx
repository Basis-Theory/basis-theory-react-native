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
    test('input masks date correctly', () => {
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

  describe('Validation and Change Events', () => {
    test.each([
      [
        'should error: incomplete',
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
        'should error: invalid',
        '14/99',
        {
          complete: false,
          empty: false,
          errors: [{ targetId: 'expirationDate', type: 'invalid' }],
          maskSatisfied: true,
          valid: false,
        },
        '14/99',
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

  describe('OnBlur', () => {
    test('triggers event', () => {
      const onBlur = jest.fn();

      render(
        <CardExpirationDateElement
          btRef={mockedRef}
          placeholder="Expiration Date"
          style={{}}
          onBlur={onBlur}
        />
      );

      const el = screen.getByPlaceholderText('Expiration Date');

      fireEvent(el, 'blur');

      expect(onBlur).toHaveBeenCalledWith({
        complete: false,
        empty: true,
        errors: undefined,
        maskSatisfied: false,
        valid: false,
      });
    });
  });

  describe('OnFocus', () => {
    test('triggers event', () => {
      const onFocus = jest.fn();

      render(
        <CardExpirationDateElement
          btRef={mockedRef}
          placeholder="Expiration Date"
          style={{}}
          onFocus={onFocus}
        />
      );

      const el = screen.getByPlaceholderText('Expiration Date');

      fireEvent(el, 'focus');

      expect(onFocus).toHaveBeenCalledWith({
        complete: false,
        empty: true,
        errors: undefined,
        maskSatisfied: false,
        valid: false,
      });
    });
  });
});
