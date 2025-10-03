import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  onCardClick: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};
