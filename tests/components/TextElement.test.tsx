/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react-native';
import { TextElement } from '../../src';

describe('TextElement', () => {
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

  describe('Field', () => {
    test('works', () => {
      render(
        <TextElement btRef={mockedRef} placeholder="Name on Card" style={{}} />
      );

      const el = screen.getByPlaceholderText('Name on Card');

      fireEvent.changeText(el, 'Peter Panda');

      expect(el.props.value).toStrictEqual('Peter Panda');
    });
  });

  describe('Events', () => {
    describe('OnChange w/ mask', () => {
      test.each([
        [
          'should error',
          '1',
          {
            complete: false,
            empty: false,
            errors: [{ targetId: 'text', type: 'incomplete' }],
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
          '1234567890',
          {
            complete: true,
            maskSatisfied: true,
            valid: true,
            empty: false,
          },
          '123-45-6789',
        ],
      ])('input: %s', (_, inputValue, expectedEvent, expectedValue) => {
        const onChange = jest.fn();

        render(
          <TextElement
            btRef={mockedRef}
            placeholder="SSN"
            mask={[
              /\d/u,
              /\d/u,
              /\d/u,
              '-',
              /\d/u,
              /\d/u,
              '-',
              /\d/u,
              /\d/u,
              /\d/u,
              /\d/u,
            ]}
            style={{}}
            onChange={onChange}
          />
        );

        const el = screen.getByPlaceholderText('SSN');

        fireEvent.changeText(el, inputValue);

        expect(el.props.value).toStrictEqual(expectedValue);
        expect(onChange).toHaveBeenCalledWith(expectedEvent);
      });
    });
  });
});
