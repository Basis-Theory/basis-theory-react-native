/**
 * @format
 */

import 'react-native';
import React from 'react';

import {
  render,
  fireEvent,
  screen,
  userEvent,
} from '@testing-library/react-native';
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

  describe('OnBlur', () => {
    test('triggers event', () => {
      const onBlur = jest.fn();

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
          onBlur={onBlur}
        />
      );

      const el = screen.getByPlaceholderText('SSN');

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
          onFocus={onFocus}
        />
      );

      const el = screen.getByPlaceholderText('SSN');

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
