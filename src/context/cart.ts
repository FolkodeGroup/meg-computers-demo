import { createContext } from 'react';
import type { Cart, CartItem } from '../types/cart';
import type { Product } from '../types/product';

export interface CartContextType {
  cart: Cart;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartItemsWithProducts: (products: Product[]) => (CartItem & { product: Product })[];
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
