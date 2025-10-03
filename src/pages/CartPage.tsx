import React from 'react';
import { useCart } from '../hooks/useCart';
import { products } from '../data/products';
import { CartDrawer } from '../components/CartDrawer';

export const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getCartItemsWithProducts } = useCart();
  const cartItems = getCartItemsWithProducts(products);

  return (
    <CartDrawer
      isOpen={true}
      onClose={() => window.history.back()}
      cartItems={cartItems}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeFromCart}
      totalItems={cart.totalItems}
    />
  );
};
