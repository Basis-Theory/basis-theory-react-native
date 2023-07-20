import React, { useEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import type { BTRef } from './src';
import { BasisTheoryElements, CardNumber } from './src';

const App = (): JSX.Element => {
  const ref = useRef<BTRef>(null);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.viewContainer}>
          <CardNumber
            btRef={ref}
            placeholder="Card Number"
            style={styles.cardNumber}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardNumber: {
    backgroundColor: '#eeeeee',
    borderColor: 'blue',
    borderWidth: 2,
    color: 'purple',
    height: 40,
    margin: 12,
    padding: 10,
  },
  viewContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 32,
  },
});

export default App;
