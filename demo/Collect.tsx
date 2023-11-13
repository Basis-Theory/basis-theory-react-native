/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import type { BTRef, BTDateRef } from '../src';
import {
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  useBasisTheory,
} from '../src';
import { Token } from '@basis-theory/basis-theory-js/types/models';
import { styles } from './styles';
import { ElementEvents } from '../App';
import { ElementEvent } from '../src/components/shared/useElementEvent';

export const Collect = () => {
  const [token, setToken] = useState<Token | undefined>();
  const [elementsEvents, setElementsEvents] = useState<ElementEvents>({
    cardExpirationDate: undefined,
    cvc: undefined,
    cardNumber: undefined,
  });

  const cardNumberRef = useRef<BTRef>(null);
  const cardExpirationDateRef = useRef<BTDateRef>(null);
  const cardVerificationCodeRef = useRef<BTRef>(null);

  const { bt, error } = useBasisTheory('<API_KEY>');

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const updateElementsEvents =
    (eventSource: 'cardExpirationDate' | 'cardNumber' | 'cvc') =>
    (event: ElementEvent) => {
      setElementsEvents({
        ...elementsEvents,
        [eventSource]: event,
      });
    };

  const createToken = async () => {
    try {
      const _token = await bt?.tokens.create({
        type: 'card',
        data: {
          number: cardNumberRef.current,
          expiration_month: cardExpirationDateRef.current?.month(),
          expiration_year: cardExpirationDateRef.current?.year(),
          cvc: cardVerificationCodeRef.current,
        },
      });

      console.log(_token?.id);
      setToken(_token);
    } catch (error) {
      console.error(error);
    }
  };

  const clearToken = () => {
    cardExpirationDateRef.current?.clear();
    cardNumberRef.current?.clear();
    cardVerificationCodeRef.current?.clear();

    setToken({} as unknown as Token);
  };

  const disabled = useMemo(
    () =>
      !(
        elementsEvents.cardExpirationDate?.valid &&
        elementsEvents.cardNumber?.valid &&
        elementsEvents.cvc?.valid
      ),
    [elementsEvents]
  );

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

          <Pressable
            disabled={disabled}
            onPress={createToken}
            style={{
              marginTop: 24,
              ...(disabled ? styles.buttonDisabled : styles.button),
            }}
          >
            <Text
              style={disabled ? styles.buttonTextDisabled : styles.buttonText}
            >
              {'Collect'}
            </Text>
          </Pressable>

          <Pressable onPress={clearToken} style={styles.button}>
            <Text style={styles.buttonText}>{'Clear'}</Text>
          </Pressable>

          <Text style={styles.text}>{JSON.stringify(token, undefined, 2)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
