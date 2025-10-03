import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types/product';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({ 
  product, 
  quantity, 
  onUpdateQuantity, 
  onRemove 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark/30 p-4 rounded-lg mb-4 border border-neutral/20"
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-semibold text-lg break-words">{product.name}</h3>
            <p className="text-neutral/80 text-sm mb-2">{product.brand} • SKU: {product.sku}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 bg-dark/50 rounded flex items-center justify-center hover:bg-dark/70 transition-colors"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-lg font-bold min-w-8 text-center">{quantity}</span>
          <button
            onClick={() => onUpdateQuantity(Math.min(product.stock, quantity + 1))}
            className="w-8 h-8 bg-dark/50 rounded flex items-center justify-center hover:bg-dark/70 transition-colors"
            disabled={quantity >= product.stock}
          >
            +
          </button>
          <span className="text-sm text-neutral/70">
            (Disponible: {product.stock})
          </span>
        </div>

        <div className="text-center mt-2">
          <button
            onClick={onRemove}
            className="px-4 py-1 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </motion.div>
  );
};
