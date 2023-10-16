/**
 * @format
 */

import 'react-native';
import React from 'react';
import { CardVerificationCodeElement } from '../../src/components/CardVerificationCodeElement';

import { render, fireEvent, screen } from '@testing-library/react-native';

describe('CardVerificationCodeElement', () => {
  test.each([3, 4])(
    'applies mask correctly with cvcLength = %d',
    (cvcLength) => {
      render(
        <CardVerificationCodeElement
          btRef={{
            current: {
              id: '123',
              format: () => '',
              clear: () => {},
              setValue: () => {},
              focus: () => {},
              blur: () => {},
            },
          }}
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
