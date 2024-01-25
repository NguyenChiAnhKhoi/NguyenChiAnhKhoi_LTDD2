import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';




const TestScreen = () => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
    {/* <Image source={require('../assets/logo.png')} style={styles.image} /> */}
    <View style={styles.contentContainer}>
      <Text style={styles.title}>title</Text>
      <Text style={styles.subtitle}>subtitle</Text>
      <Text style={styles.ctaText}>ctaText</Text>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
image: {
  width: 200,
  height: 150,
  resizeMode: 'contain',
},
contentContainer: {
    backgroundColor: '#ACBDB8',
    paddingHorizontal: 16,
    paddinVegrtical: 32,
    marginBottom: 10,
    borderRadius: 20,
},
title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 10,
},
subtitle: {
  fontSize: 16,
  marginBottom: 10,
},
ctaText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#007AFF',
},
});

export default TestScreen;