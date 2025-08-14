import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = product => {
    setItems(prev => {
      const found = prev.find(i => i.product.id === product.id);
      if (found) {
        return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (productId, qty) => {
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, qty } : i).filter(i => i.qty > 0));
  };

  const removeFromCart = productId => setItems(prev => prev.filter(i => i.product.id !== productId));

  const clearCart = () => setItems([]);

  const getTotal = () => items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQty, removeFromCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
