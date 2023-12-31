import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './Menu';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.additionalText}>Anh Khoi</Text>
      <StatusBar style="auto" />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  additionalText: {
    color: 'white',
    marginTop: 5,
  },
});