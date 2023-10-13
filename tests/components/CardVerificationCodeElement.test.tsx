/**
 * @format
 */

import 'react-native';
import React from 'react';
import { CardVerificationCodeElement } from '../../src/components/CardVerificationCodeElement';

// Note: test renderer must be required after react-native.
import { render } from '@testing-library/react-native';

it('renders correctly', () => {
  const { getByPlaceholderText, debug } = render(
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
      cvcLength={3}
      style={{}}
    />
  );

  expect(getByPlaceholderText('CVC'));
});
