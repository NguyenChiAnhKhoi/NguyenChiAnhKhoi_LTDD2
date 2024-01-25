import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../AuthContext/AuthContext';
import { useState } from 'react';
import { useContext } from 'react';

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);


  const handleRegister = () => {
    navigation.navigate('Register');
  };
  const handleLogin = () => {
    const loginSuccess = login(email, password);
    if (loginSuccess) {
        Alert.alert('Đăng nhập thành công!');
        navigation.replace('Home');
    }
    if (!loginSuccess) {
        Alert.alert('Sai tài khoản hoặc mật khẩu, hãy kiểm tra lại thông tin');
    }


  };
  return (
    <View style={styles.aa}>
     
    <View style={styles.container}>
   
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Đăng ký ngay</Text>

        </TouchableOpacity>
        
      </View>
      <StatusBar style="auto" />
      
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  aa: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  formContainer: {
    width: '60%',
  },
 
  
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    color: 'blue',
  },
});