import { useContext } from 'react';
import { CartContext, type CartContextType } from '../context/cart';

export const useCart = () => {
  const context = useContext<CartContextType | undefined>(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
