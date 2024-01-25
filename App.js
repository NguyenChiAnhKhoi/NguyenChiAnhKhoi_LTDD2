import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import AuthContext from './AuthContext/AuthContext';

import { CartProvider } from './CartProvider/CartContext';
import Home from './pages/Home';
import Header from './layout/Header';
import Product_detail from './pages/Product_detail';
import Footer from './layout/Footer';
import Menu from './layout/Menu';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import Search from './pages/SearchBar';
import Register from './pages/Register';
import TestScreen from './pages/TestScreen';

const Stack = createStackNavigator();

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);

  const register = (email, password) => {
    setRegisteredUser({ email, password });
  };

  const login = (email, password) => {
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
    <CartProvider>
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Header></Header>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: 'Trang chủ' }} // Thay đổi tiêu đề hiển thị
          />
          <Stack.Screen name="Productdetail" component={Product_detail} options={{ headerTitle: 'Chi tiết sản phẩm' }} />
          <Stack.Screen name="Login" component={Login} options={{ headerTitle: 'Trang đăng nhập' }}  />
          <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: 'Giỏ hàng của bạn' }}  />
          <Stack.Screen name="Payment" component={Payment} options={{ headerTitle: 'Thanh toán' }}  />
          <Stack.Screen name="Search" component={Search} options={{ headerTitle: 'Tìm kiếm' }}  />
          <Stack.Screen name="Register" component={Register} options={{ headerTitle: 'Trang đăng ký' }}   />
          <Stack.Screen name="TestScreen" component={TestScreen} options={{ headerTitle: 'Trang test' }}   />
        </Stack.Navigator>
        <Menu/>
      </NavigationContainer>
    </View>
    </CartProvider>

    </AuthContext.Provider>
  );
};