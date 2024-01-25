import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../AuthContext/AuthContext';
import { useState } from 'react';
import { useContext } from 'react';
export default function Register() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không trùng khớp');
    } else if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Hãy điền đầy đủ thông tin');
    } else {
      register(email, password);
      Alert.alert('Đăng ký thành công');
      navigation.replace('Login');
    }
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };
 

  return (
    <View style={styles.aa}>
     
    <View style={styles.container}>
   
      <Text style={styles.title}>Đăng ký</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          onChangeText={text => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Đã có tài khoản?</Text>

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '60%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText: {
    color: 'blue',
  },
});