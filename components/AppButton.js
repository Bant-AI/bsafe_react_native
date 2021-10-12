import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '../utils/colors';
import {
  useFonts,
  FiraSans_500Medium,
} from '@expo-google-fonts/fira-sans';

export default function AppButton({ title, onPress, color = 'primary' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#1296D4" }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%'
  },
  buttonText: {
    fontFamily: 'FiraSans_500Medium',
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  }
});
