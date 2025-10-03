import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import type { Product } from '../types/product';
import { CartItem } from './CartItem';
import { QuoteModal } from './QuoteModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Array<{
    productId: string;
    quantity: number;
    product: Product;
  }>;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  totalItems: number;
  className?: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  totalItems,
  className = ''
}) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  if (cartItems.length === 0) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-50 md:right-0 md:w-96 md:h-full bg-dark/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-4 md:p-0 overflow-y-auto"
          ><div className={`max-w-md mx-auto bg-dark/90 rounded-lg h-full md:h-auto md:rounded-l-lg md:shadow-2xl border-l-4 border-primary border-2 ${className}`}>
              <div className="sticky top-0 bg-dark/90 p-4 border-b border-neutral/20 flex justify-between items-center">
                <h2 className="text-xl font-bold neon-text">Tu Pedido</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-dark/50 rounded-lg transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold mb-2">Tu carrito está vacío</h3>
                <p className="text-neutral/70 mb-6">Agrega productos para cotizar</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-primary text-dark rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Seguir comprando
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-50 md:right-0 md:w-96 md:h-full bg-dark/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-4 md:p-0 overflow-y-auto"
          ><div className={`max-w-md mx-auto bg-dark/90 rounded-lg h-full md:h-auto md:rounded-l-lg md:shadow-2xl border-l-4 border-primary border-2 ${className}`}>
              <div className="sticky top-0 bg-dark/90 p-4 border-b border-neutral/20 flex justify-between items-center">
                <h2 className="text-xl font-bold neon-text">Tu Pedido</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-dark/50 rounded-lg transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-4">
                {cartItems.map(item => (
                  <CartItem
                    key={item.productId}
                    product={item.product}
                    quantity={item.quantity}
                    onUpdateQuantity={(newQuantity) => onUpdateQuantity(item.productId, newQuantity)}
                    onRemove={() => onRemoveItem(item.productId)}
                  />
                ))}
                
                <div className="bg-dark/30 p-4 rounded-lg mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total de unidades:</span>
                    <span className="text-2xl font-bold text-accent">{totalItems}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full py-3 bg-primary text-dark rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors glow-effect"
                  >
                    Solicitar Cotización
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        cartItems={cartItems}
        totalItems={totalItems}
      />
    </>
  );
};
