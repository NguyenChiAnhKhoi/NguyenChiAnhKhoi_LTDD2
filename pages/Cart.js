import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { CartContext } from '../CartProvider/CartContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Cart = () => {
  const { updateCartItemCount } = useContext(CartContext);
  const navigation = useNavigation();
  
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);


  const fetchCartItems = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      if (cartItemsData) {
        const parsedCartItems = JSON.parse(cartItemsData);
        setCartItems(parsedCartItems);
        updateCartItemCount(getCartItemCount(parsedCartItems));
      }
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecreaseQuantity = (productId) => {
    setCartItems((prevItems) => 
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          return null;
        }
        return item;
      }).filter(Boolean);

      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      updateCartItemCount(getCartItemCount(updatedCartItems));

    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  const getCartItemCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      {cartItems.length > 0 ? (
        <FlatList

          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
               
                <Text style={styles.cartItemPrice}> ${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.quantityContainer}>
                <View style={styles.quantityPlusMinus}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleIncreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
                <Text style={styles.cartItemQuantity}> {item.quantity} </Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => handleDecreaseQuantity(item.id)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                </View>
             
              <TouchableOpacity style={styles.removeItemButton} onPress={() => handleRemoveItem(item.id)}>
                <Text>
                  <Icon name="trash" style={styles.removeItemText} />
                </Text>

              </TouchableOpacity>

              </View>
              

            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyCartText}>Giỏ hàng trống.</Text>
      )}
       <Text style={styles.totalPrice}>Tổng cộng: </Text>
      <View style={styles.totalPriceContainer}>
     
        <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
      <TouchableOpacity style={styles.buttonCheckOut} onPress={handleCheckout}>
          <Text style={styles.buttonCheckOutText}>THANH TOÁN</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quantityPlusMinus:{
    flexDirection: 'row',
  },
  quantityContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#86BCAD',
    borderRadius: 30,
    marginRight: 2,
    marginLeft: 2,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 2,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 12,
  },
  cartItemQuantity:{
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeItemText: {
    fontSize: 25 ,
    color: 'red',
  },
  emptyCartText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 10,
  },
  removeItemButton:{
    paddingLeft: 20,
    
  },
  quantityButton:{
    backgroundColor: 'white',
    paddingHorizontal: 5,
    marginLeft:'',
    alignItems: 'center',
    borderRadius: 60,
  },
  quantityButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPriceContainer:{

    backgroundColor: '#ACBDB8',
    paddingHorizontal: 16,
    paddinVegrtical: 32,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonCheckOut:{
    backgroundColor: '#001C8C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonCheckOutText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  

});

export default Cart;