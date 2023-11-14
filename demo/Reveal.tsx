/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import {
  type BTRef,
  type ElementEvent,
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  useBasisTheory,
} from '../src';
import { styles } from './styles';

import type { InputBtDateRef, InputBTRef } from '../src/BaseElementTypes';
import type { ElementEvents } from '../App';

type CardToken = {
  expiration_year: InputBtDateRef;
  expiration_month: InputBtDateRef;
  number: InputBTRef;
  cvc?: InputBTRef;
};

export const Reveal = () => {
  const [elementsEvents, setElementsEvents] = useState<ElementEvents>({
    cardExpirationDate: undefined,
    cvc: undefined,
    cardNumber: undefined,
  });

  const cardNumberRef = useRef<BTRef>(null);
  const cardExpirationDateRef = useRef<BTRef>(null);
  const cardVerificationCodeRef = useRef<BTRef>(null);

  const { bt } = useBasisTheory('<API_KEY>');

  const tokenId = '<TOKEN_ID_TO_RETRIEVE>';

  const display = async () => {
    try {
      const session = await bt?.sessions.create();

      // authorize the session
      await fetch('< YOUR_BT_SESSION_AUTH_ENDPOINT >', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nonce: session?.nonce,
          tokenId,
        }),
      });

      const _token = await bt?.tokens.getById(tokenId, session?.sessionKey);

      cardNumberRef.current?.setValue((_token?.data as CardToken).number);

      cardExpirationDateRef.current?.setValue({
        month: (_token?.data as CardToken).expiration_month,
        year: (_token?.data as CardToken).expiration_year,
      });
      cardVerificationCodeRef.current?.setValue(
        (_token?.data as CardToken).cvc
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateElementsEvents =
    (eventSource: 'cardExpirationDate' | 'cardNumber' | 'cvc') =>
    (event: ElementEvent) => {
      setElementsEvents({
        ...elementsEvents,
        [eventSource]: event,
      });
    };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.viewContainer}>
          <CardNumberElement
            btRef={cardNumberRef}
            onChange={updateElementsEvents('cardNumber')}
            placeholder="Card Number"
            placeholderTextColor="#99a0bf"
            style={styles.elements}
          />
          <CardExpirationDateElement
            btRef={cardExpirationDateRef}
            onChange={updateElementsEvents('cardExpirationDate')}
            placeholder="Card Expiration Date"
            placeholderTextColor="#99a0bf"
            style={styles.elements}
          />
          <CardVerificationCodeElement
            btRef={cardVerificationCodeRef}
            cvcLength={3}
            onChange={updateElementsEvents('cvc')}
            placeholder="CVC"
            placeholderTextColor="#99a0bf"
            style={styles.elements}
          />

          <Pressable onPress={display} style={styles.button}>
            <Text style={styles.buttonText}>{'Reveal'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
