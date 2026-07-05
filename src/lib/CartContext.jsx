import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [fulfillmentType, setFulfillmentType] = useState("pickup");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderChoiceOpen, setOrderChoiceOpen] = useState(false);

  const addItem = useCallback((item) => {
    setItems(prev => [...prev, { ...item, cartId: Date.now() + Math.random() }]);
  }, []);

  const updateItem = useCallback((cartId, updates) => {
    setItems(prev => prev.map(i => i.cartId === cartId ? { ...i, ...updates } : i));
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems(prev => prev.filter(i => i.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + (i.quantity || 1), 0);
  const subtotal = items.reduce((sum, i) => {
    const qty = i.quantity || 1;
    return sum + ((i.base_price || 0) + (i.extras_total || 0)) * qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clearCart, itemCount, subtotal, fulfillmentType, setFulfillmentType, cartOpen, setCartOpen, orderChoiceOpen, setOrderChoiceOpen }}>
      {children}
    </CartContext.Provider>
  );
}
