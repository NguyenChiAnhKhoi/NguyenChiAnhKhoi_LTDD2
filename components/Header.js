import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
       <Icon name="bars"
      size={25}
      color="black" 
      style={styles.icon1}/>
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 40 ,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1:{
    paddingLeft:5,
  },
  logo: {
    width: 100,
    height: 60,
    marginRight: 5,
  },
});