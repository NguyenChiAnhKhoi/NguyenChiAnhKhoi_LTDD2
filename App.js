import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Header from './components/Header';
import Product_detail from './components/Product_detail';
import Menu from './components/Menu';
import Cart from './components/Cart';
import { CartProvider } from './CartProvider/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
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
          <Stack.Screen name="SingleProduct" component={Product_detail} options={{ headerTitle: 'Chi tiết sản phẩm' }} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
        <Menu/>
      </NavigationContainer>
    </View>
    </CartProvider>
  );
};