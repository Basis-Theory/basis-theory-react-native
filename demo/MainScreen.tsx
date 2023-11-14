import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { RootStackParamList } from '../App';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Collect' | 'Reveal'>;

const MainScreen = ({ navigation }: { navigation: Props['navigation'] }) => {
  const navigateTo = (route: Props['route']['name']) => (): void => {
    navigation.navigate(route);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pressable onPress={navigateTo('Collect')} style={styles.button}>
        <Text style={styles.buttonText}>{'Collect'}</Text>
      </Pressable>

      <Pressable onPress={navigateTo('Reveal')} style={styles.button}>
        <Text style={styles.buttonText}>{'Reveal'}</Text>
      </Pressable>
    </View>
  );
};

export { MainScreen };
