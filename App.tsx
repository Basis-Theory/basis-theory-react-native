import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainScreen } from './demo/MainScreen';
import { Collect } from './demo/Collect';
import { Reveal } from './demo/Reveal';
import type { ElementEvent } from './src';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  ['Basis Theory React Native SDK']: undefined;
  Collect: undefined;
  Reveal: undefined;
};

type ElementEvents = Record<
  'cardExpirationDate' | 'cardNumber' | 'cvc',
  ElementEvent | undefined
>;

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Basis Theory React Native SDK"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#121324',
        },
        contentStyle: {
          backgroundColor: '#070a1b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        component={MainScreen}
        name="Basis Theory React Native SDK"
      />
      <Stack.Screen
        component={Collect}
        name="Collect"
        options={{ title: 'Collect Card Information' }}
      />
      <Stack.Screen
        component={Reveal}
        name="Reveal"
        options={{ title: 'Reveal Card Information' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export type { RootStackParamList, ElementEvents };
export default App;
