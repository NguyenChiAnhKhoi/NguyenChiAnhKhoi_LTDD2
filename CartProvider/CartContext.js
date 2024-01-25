import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setCartItemsCount(cartItemsCount + 1);
  };

  const updateCartItemCount = (count) => {
    setCartItemsCount(count);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartItemsCount, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};