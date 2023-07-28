# Basis Theory React Native SDK

[![Version](https://img.shields.io/npm/v/@basis-theory/basis-theory-react-native.svg)](https://www.npmjs.org/package/@basis-theory/basis-theory-react-native)
[![Downloads](https://img.shields.io/npm/dm/@basis-theory/basis-theory-react-native.svg)](https://www.npmjs.org/package/@basis-theory/basis-theory-react-native)
[![Verify](https://github.com/Basis-Theory/basis-theory-react-native/actions/workflows/release.yml/badge.svg)](https://github.com/Basis-Theory/basis-theory-react-native/actions/workflows/release.yml)

The [Basis Theory](https://basistheory.com/) React Native SDK

## Installation

Using [Node Package Manager](https://docs.npmjs.com/)

```sh
npm install --save @basis-theory/basis-theory-react-native
```

Using [Yarn](https://classic.yarnpkg.com/en/docs/)

```sh
yarn add @basis-theory/basis-theory-react-native
```

## Documentation

For a complete list of endpoints and examples, please refer to our [React Native docs](https://developers.basistheory.com/docs/sdks/mobile/react-native/)

## Usage Examples

### Reveal Sensitive Data w/ Proxy

```jsx
import React, { useRef } from 'react';
import {
  CardNumberElement,
  CardExpirationDateElement,
  CardVerificationCodeElement,
  BasisTheoryElements,
  BTRef,
} from '@basis-theory/basis-theory-react-native';

const MyForm = () => {
  const cardNumberRef = useRef<BTRef>(null);
  const cardExpirationDateRef = useRef<BTRef>(null);
  const cardVerificationCodeRef = useRef<BTRef>(null);

  const getCardData = async () => {
    const proxyResponse = await BasisTheoryElements.proxy({
      headers: {
        'BT-API-KEY': '<YOUR SESSION API KEY>',
        'BT-PROXY-KEY': '<YOUR PROXY KEY>',
      },
      method: 'post',
    });

    cardNumberRef.current?.setValue(proxyResponse.json.cardNumber);
    cardExpirationDateRef.current?.setValue(proxyResponse.json.expDate);
    cardVerificationCodeRef.current?.setValue(proxyResponse.json.cvc);
  };

  return (
    <>
      <CardNumberElement
        btRef={cardNumberRef}
        placeholder="Card Number"
      />
      <CardExpirationDateElement
        btRef={cardExpirationDateRef}
        placeholder="Card Expiration Date"
      />
      <CardVerificationCodeElement
        btRef={cardVerificationCodeRef}
        placeholder="CVC"
      />
      <div>
        <button type="button" onClick={getCardData}>
          "Get Card Data"
        </button>
      </div>
    </>
  );
};
```

## Development

The provided scripts with the SDK will check for all dependencies, build the solution and run all tests.

### Dependencies

- [NodeJS](https://nodejs.org/en/) > 18
- [Yarn](https://classic.yarnpkg.com/en/docs/)

### Build the SDK and run Tests

Run the following command from the root of the project:

```sh
make verify
```

