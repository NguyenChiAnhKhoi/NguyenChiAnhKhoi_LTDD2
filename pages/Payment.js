import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const navigation = useNavigation();

  const handlePayment = () => {
    navigation.navigate('Home');
    clearAsyncStorage();
    
  };
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Purchased successfully');
    } catch (error) {
      console.error('Purchase failed', error);
    }
  };
  return (
    <ScrollView style={styles.container}>


      <View style={styles.formGroup}>
        <Text style={styles.label}>Số thẻ</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số thẻ"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ngày hết hạn</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/YY"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
      </View>

      <View style={styles.paymentOptions}>
        <Text style={styles.paymentLabel}>Chọn phương thức thanh toán</Text>
        <View style={styles.paymentIcons}>
          <FontAwesome name="cc-mastercard" size={40} color="#FF6F00" style={styles.paymentIcon} />
          <FontAwesome name="cc-paypal" size={40} color="#00457C" style={styles.paymentIcon} />
          <FontAwesome name="cc-visa" size={40} color="#6772E5" style={styles.paymentIcon} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  paymentOptions: {
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  paymentIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Payment;