/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
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

  const [tokenId, setTokenId] = useState('');

  const [elementsEvents, setElementsEvents] = useState<ElementEvents>({
    cardExpirationDate: undefined,
    cvc: undefined,
    cardNumber: undefined,
  });

  const cardNumberRef = useRef<BTRef>(null);
  const cardExpirationDateRef = useRef<BTDateRef>(null);
  const cardVerificationCodeRef = useRef<BTRef>(null);

  const { bt, error } = useBasisTheory('<API_KEY>');

  const [cvcLength, setCvcLength] = useState<number>();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const updateElementsEvents =
    (eventSource: 'cardExpirationDate' | 'cardNumber' | 'cvc') =>
    (event: ElementEvent) => {
      if (event.cvcLength) {
        setCvcLength(event.cvcLength);
      }

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

      if (_token?.id) setTokenId(_token?.id);

      setToken(_token);
    } catch (error) {
      console.error(error);
    }
  };

  const updateToken = async () => {
    try {
      if (token?.id || tokenId) {
        const _token = await bt?.tokens.update(token?.id || tokenId, {
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
      if (token?.id || tokenId) {
        await bt?.tokens.delete(token?.id || tokenId);

        Alert.alert(
          `Token Deleted`,
          `Token with ID ${token?.id || tokenId} has been deleted`,
          [{ text: 'OK' }]
        );

        setToken(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearToken = () => {
    cardExpirationDateRef.current?.clear();
    cardNumberRef.current?.clear();
    cardVerificationCodeRef.current?.clear();

    setTokenId('');
    setToken(undefined);
    setTokenizedData(undefined);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.viewContainer}>
          <TextInput
            placeholder="Token ID*"
            style={styles.elements}
            onChangeText={setTokenId}
            placeholderTextColor="#99a0bf"
            value={tokenId}
          />

          <CardNumberElement
            btRef={cardNumberRef}
            keyboardType="numeric"
            onChange={updateElementsEvents('cardNumber')}
            placeholder="Card Number"
            placeholderTextColor="#99a0bf"
            style={styles.elements}
          />
          <CardExpirationDateElement
            btRef={cardExpirationDateRef}
            keyboardType="numeric"
            onChange={updateElementsEvents('cardExpirationDate')}
            placeholder="Card Expiration Date"
            placeholderTextColor="#99a0bf"
            style={styles.elements}
          />
          <CardVerificationCodeElement
            btRef={cardVerificationCodeRef}
            cvcLength={cvcLength}
            keyboardType="numeric"
            onChange={updateElementsEvents('cvc')}
            placeholder={'Security code'}
            placeholderTextColor="#99a0bf"
            style={styles.elements}
          />

          <Pressable
            onPress={createToken}
            style={{
              marginTop: 24,
              ...styles.button,
            }}
          >
            <Text style={styles.buttonText}>{'Create token'}</Text>
          </Pressable>

          <Pressable
            onPress={updateToken}
            style={{
              ...styles.button,
            }}
          >
            <Text style={styles.buttonText}>{'Update Token'}</Text>
          </Pressable>

          <Pressable
            onPress={deleteToken}
            style={{
              ...styles.button,
            }}
          >
            <Text style={styles.buttonText}>{'Delete Token'}</Text>
          </Pressable>

          <Divider />

          <Pressable
            onPress={createTokenWithTokenize}
            style={{
              ...styles.button,
            }}
          >
            <Text style={styles.buttonText}>{'Tokenize Data'}</Text>
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
