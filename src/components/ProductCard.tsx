import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onCardClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCardClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-dark/50 rounded-lg overflow-hidden shadow-lg border border-neutral/20 backdrop-blur-sm cursor-pointer sun-effect h-full flex flex-col"
      onClick={() => onCardClick(product)}
    >
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-110 p-2"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            } text-black`}>
              {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
            </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-neutral text-sm mb-3">{product.brand} • {product.category}</p>
          <p className="text-neutral/80 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-end items-center text-primary font-medium mt-auto">
            <span>Ver detalles</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
