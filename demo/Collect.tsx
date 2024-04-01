/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import type { BTRef, BTDateRef, ElementEvent } from '../src';
import {
  CardExpirationDateElement,
  CardNumberElement,
  CardVerificationCodeElement,
  useBasisTheory,
} from '../src';
import type {
  Token,
  TokenizeData,
} from '@basis-theory/basis-theory-js/types/models';
import { styles } from './styles';
import type { ElementEvents } from '../App';

const Divider = () => <View style={styles.divider} />;

export const Collect = () => {
  const [token, setToken] = useState<Token | undefined>();
  const [tokenizedData, setTokenizedData] = useState<
    TokenizeData | undefined
  >();
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

  const createTokenWithTokenize = async () => {
    try {
      const _token = await bt?.tokens.tokenize({
        type: 'card',
        data: {
          number: cardNumberRef.current,
          expiration_month: cardExpirationDateRef.current?.month(),
          expiration_year: cardExpirationDateRef.current?.year(),
          cvc: cardVerificationCodeRef.current,
        },
      });

      setTokenizedData(_token);
    } catch (error) {
      console.error(error);
    }
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

      setToken(_token);
    } catch (error) {
      console.error(error);
    }
  };

  const updateToken = async () => {
    try {
      if (token?.id) {
        const _token = await bt?.tokens.update(token?.id, {
          data: {
            number: cardNumberRef.current,
            expiration_month: cardExpirationDateRef.current?.month(),
            expiration_year: cardExpirationDateRef.current?.year(),
          },
        });

        setToken(_token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteToken = async () => {
    try {
      if (token?.id) {
        const tokenID = token?.id;

        await bt?.tokens.delete(token?.id);

        setToken(undefined);

        Alert.alert(
          `Token Deleted`,
          `Token with ID ${tokenID} has been deleted`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearToken = () => {
    cardExpirationDateRef.current?.clear();
    cardNumberRef.current?.clear();
    cardVerificationCodeRef.current?.clear();

    setToken(undefined);
    setTokenizedData(undefined);
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
              {'Create token'}
            </Text>
          </Pressable>

          <Pressable
            disabled={disabled}
            onPress={updateToken}
            style={{
              ...(disabled ? styles.buttonDisabled : styles.button),
            }}
          >
            <Text
              style={disabled ? styles.buttonTextDisabled : styles.buttonText}
            >
              {'Update Token'}
            </Text>
          </Pressable>

          <Pressable
            disabled={disabled}
            onPress={deleteToken}
            style={{
              ...(disabled ? styles.buttonDisabled : styles.button),
            }}
          >
            <Text
              style={disabled ? styles.buttonTextDisabled : styles.buttonText}
            >
              {'Delete Token'}
            </Text>
          </Pressable>

          <Divider />

          <Pressable
            disabled={disabled}
            onPress={createTokenWithTokenize}
            style={{
              ...(disabled ? styles.buttonDisabled : styles.button),
            }}
          >
            <Text
              style={disabled ? styles.buttonTextDisabled : styles.buttonText}
            >
              {'Tokenize Data'}
            </Text>
          </Pressable>

          <Divider />

          <Pressable onPress={clearToken} style={styles.button}>
            <Text style={styles.buttonText}>{'Clear'}</Text>
          </Pressable>

          {token && (
            <>
              <Divider />
              <Text style={styles.text}>TOKEN: </Text>

              <Text style={styles.text}>
                {JSON.stringify(token, undefined, 2)}
              </Text>
            </>
          )}

          {tokenizedData && (
            <>
              <Divider />
              <Text style={styles.text}>TOKENIZED DATA: </Text>
              <Text style={styles.text}>
                {JSON.stringify(tokenizedData, undefined, 2)}
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
