/**
 * @format
 */

import { VISA, MASTERCARD } from '@basis-theory/basis-theory-js/types/elements';
import 'react-native';
import React from 'react';

import {
  render,
  userEvent,
  fireEvent,
  screen,
} from '@testing-library/react-native';
import { CardNumberElement } from '../../src';
import cardValidator from 'card-validator';

describe('CardNumberElement', () => {
  beforeEach(() => {
    cardValidator.creditCardType.resetModifications();
  });

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
    test('input masks card number correctly', () => {
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

  describe('CustomBin', () => {
    test('validates custom bin', async () => {
      const doStuff = jest.fn();

      const { getByPlaceholderText } = render(
        <CardNumberElement
          btRef={mockedRef}
          cardTypes={[
            {
              ...VISA,
              patterns: [...VISA.patterns, 8405], // add custom bin to VISA from tabapay
            },
            MASTERCARD,
          ]}
          onChange={doStuff}
          placeholder="Card Number"
          style={{}}
        />
      );

      const el = getByPlaceholderText('Card Number');

      fireEvent.changeText(el, '8405840704999997', {});

      expect(doStuff).toHaveBeenLastCalledWith({
        empty: false,
        errors: undefined,
        valid: true,
        maskSatisfied: true,
        complete: true,
        cvcLength: 3,
        cardBin: '84058407',
        cardLast4: '9997',
        brand: 'visa',
      });
    });

    test('returns unknown for valid bin and unsuported card brand', async () => {
      const doStuff = jest.fn();

      const { getByPlaceholderText } = render(
        <CardNumberElement
          btRef={mockedRef}
          cardTypes={[VISA]}
          onChange={doStuff}
          placeholder="Card Number"
          style={{}}
        />
      );

      const el = getByPlaceholderText('Card Number');

      fireEvent.changeText(el, '5555555555554444', {});

      expect(doStuff).toHaveBeenLastCalledWith({
        empty: false,
        errors: [{ targetId: 'cardNumber', type: 'invalid' }],
        valid: false,
        maskSatisfied: true,
        complete: false,
        cvcLength: undefined,
        brand: 'unknown',
      });
    });
  });

  describe('Dynamic card lengths', () => {
    test('input masks card number correctly and emits the correct events', () => {
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

      fireEvent.changeText(el, '4242424242424241');

      expect(el.props.value).toStrictEqual('4242 4242 4242 4241');

      // does not pass luhn validation and meets first mask
      expect(onChange).toHaveBeenCalledWith({
        brand: 'visa',
        cardBin: undefined, // card is not valid hence cardBin is not computed
        cardLast4: undefined, // card is not valid hence cardLast4 is not computed
        cvcLength: 3,
        complete: false,
        empty: false,
        errors: [{ targetId: 'cardNumber', type: 'invalid' }],
        maskSatisfied: true,
        valid: false,
      });

      fireEvent.changeText(el, '42424242424242414');

      expect(el.props.value).toStrictEqual('4242 4242 4242 42414');

      // does not meet next available mask
      expect(onChange).toHaveBeenCalledWith({
        brand: 'visa',
        cardBin: undefined, // card is not valid hence cardBin is not computed
        cardLast4: undefined, // card is not valid hence cardLast4 is not computed
        cvcLength: 3,
        complete: false,
        empty: false,
        errors: [{ targetId: 'cardNumber', type: 'incomplete' }],
        maskSatisfied: false,
        valid: false,
      });

      fireEvent.changeText(el, '424242424242424145');

      expect(el.props.value).toStrictEqual('4242 4242 4242 424145');

      // meets last mask but does not pass luhn validation
      expect(onChange).toHaveBeenCalledWith({
        brand: 'visa',
        cardBin: undefined, // card is not valid hence cardBin is not computed
        cardLast4: undefined, // card is not valid hence cardLast4 is not computed
        cvcLength: 3,
        complete: false,
        empty: false,
        errors: [{ targetId: 'cardNumber', type: 'invalid' }],
        maskSatisfied: true,
        valid: false,
      });
    });
  });

  describe('Validation and change events', () => {
    test.each([
      [
        'should error: incomplete',
        '4',
        {
          brand: 'unknown',
          complete: false,
          empty: false,
          errors: [{ targetId: 'cardNumber', type: 'incomplete' }],
          maskSatisfied: false,
          valid: false,
        },
        '4',
      ],
      [
        'should error: invalid',
        '4242424242424241',
        {
          brand: 'visa',
          cardBin: undefined, // card is not valid hence cardBin is not computed
          cardLast4: undefined, // card is not valid hence cardLast4 is not computed
          cvcLength: 3,
          complete: false,
          empty: false,
          errors: [{ targetId: 'cardNumber', type: 'invalid' }],
          maskSatisfied: true,
          valid: false,
        },
        '4242 4242 4242 4241',
      ],
      [
        'prevents addition of chars that do not belong to the mask',
        '#####',
        {
          brand: 'unknown',
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
          brand: 'visa',
          cardBin: '42424242',
          cardLast4: '4242',
          complete: true,
          cvcLength: 3,
          maskSatisfied: true,
          valid: true,
          empty: false,
        },
        '4242 4242 4242 4242',
      ],
      [
        `should work when mask is re-computed (ie. 16 -> 18 digits)`,
        '424242424242424242',
        {
          complete: true,
          maskSatisfied: true,
          brand: 'visa',
          cardBin: '42424242',
          cardLast4: '4242',
          cvcLength: 3,
          valid: true,
          empty: false,
        },
        '4242 4242 4242 424242',
      ],
    ])('input: %s', async (_, inputValue, expectedEvent, expectedValue) => {
      const user = userEvent.setup();
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

      await user.type(el, inputValue);

      expect(el.props.value).toStrictEqual(expectedValue);
      expect(onChange).toHaveBeenCalledWith(expectedEvent);
    });
  });

  describe('skipLuhnValidation', () => {
    test('skips luhn validation when skipLuhnValidation is true', async () => {
      const onChange = jest.fn();

      const { getByPlaceholderText } = render(
        <CardNumberElement
          btRef={mockedRef}
          skipLuhnValidation
          onChange={onChange}
          placeholder="Card Number"
          style={{}}
        />
      );

      const el = getByPlaceholderText('Card Number');

      // luhn invalid card
      fireEvent.changeText(el, '4242424242424241', {});

      expect(onChange).toHaveBeenLastCalledWith({
        empty: false,
        errors: undefined,
        valid: true,
        maskSatisfied: true,
        complete: true,
        cvcLength: 3,
        cardBin: undefined, // card validator does not compute 'card' when card is not valid
        cardLast4: undefined,
        brand: 'visa',
      });
    });
  });

  describe('OnBlur', () => {
    test('triggers event', () => {
      const onBlur = jest.fn();

      render(
        <CardNumberElement
          btRef={mockedRef}
          placeholder="Card Number"
          style={{}}
          onBlur={onBlur}
        />
      );

      const el = screen.getByPlaceholderText('Card Number');

      fireEvent(el, 'blur');

      expect(onBlur).toHaveBeenCalledWith({
        brand: 'unknown',
        cardBin: undefined,
        cardLast4: undefined,
        complete: false,
        cvcLength: undefined,
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
        <CardNumberElement
          btRef={mockedRef}
          placeholder="Card Number"
          style={{}}
          onFocus={onFocus}
        />
      );

      const el = screen.getByPlaceholderText('Card Number');

      fireEvent(el, 'focus');

      expect(onFocus).toHaveBeenCalledWith({
        brand: 'unknown',
        cardBin: undefined,
        cardLast4: undefined,
        complete: false,
        cvcLength: undefined,
        empty: true,
        errors: undefined,
        maskSatisfied: false,
        valid: false,
      });
    });
  });
});
