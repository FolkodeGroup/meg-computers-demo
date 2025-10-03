import React, { useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Cart, CartItem } from './types/cart';
import type { Product } from './types/product';
import { CartContext, type CartContextType } from './context/cart';

const CART_STORAGE_KEY = 'meg_computers_cart';

const getInitialCart = (): Cart => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      if (Array.isArray(parsed.items) && typeof parsed.totalItems === 'number') {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error al leer el carrito de localStorage", error);
  }
  return { items: [], totalItems: 0 };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage", error);
    }
  }, [cart]);

  const calculateTotalItems = (items: CartItem[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((prevCart: Cart) => {
      const existingItemIndex = prevCart.items.findIndex(item => item.productId === productId);
      let newItems;

      if (existingItemIndex > -1) {
        newItems = [...prevCart.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...prevCart.items, { productId, quantity }];
      }

      return { items: newItems, totalItems: calculateTotalItems(newItems) };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart: Cart) => {
      const newItems = prevCart.items.filter(item => item.productId !== productId);
      return { items: newItems, totalItems: calculateTotalItems(newItems) };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart: Cart) => {
      const newItems = prevCart.items.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      return { items: newItems, totalItems: calculateTotalItems(newItems) };
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart({ items: [], totalItems: 0 }), []);

  const getCartItemsWithProducts = useCallback((products: Product[]) => {
    return cart.items.map((cartItem: CartItem) => {
      const product = products.find(p => p.id === cartItem.productId);
      return { ...cartItem, product: product! };
    }).filter(item => item.product);
  }, [cart.items]);

  const value: CartContextType = { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartItemsWithProducts };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};