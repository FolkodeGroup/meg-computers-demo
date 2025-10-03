import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { ProductModal } from '../components/ProductModal';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types/product';
import { ProductFilters } from '../components/ProductFilters';

export const ProductPage: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    mainCategory: searchParams.get('mainCategory') || null,
    category: searchParams.getAll('category') || [],
  });

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (filters.mainCategory) {
      newSearchParams.set('mainCategory', filters.mainCategory);
    }
    filters.category.forEach(cat => newSearchParams.append('category', cat));
    setSearchParams(newSearchParams, { replace: true });
  }, [filters, setSearchParams]);

  const handleFilterChange = (type: 'mainCategory' | 'category', value: string) => {
    setFilters(prev => {
      if (type === 'mainCategory') {
        return { ...prev, mainCategory: prev.mainCategory === value ? null : value, category: [] };
      } else {
        const newCategories = prev.category.includes(value)
          ? prev.category.filter(c => c !== value)
          : [...prev.category, value];
        return { ...prev, category: newCategories };
      }
    });
  };

  const handleClearFilters = () => {
    setFilters({ mainCategory: null, category: [] });
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const mainCategoryMatch = !filters.mainCategory || product.mainCategory.toUpperCase() === filters.mainCategory;
      const categoryMatch = filters.category.length === 0 || filters.category.some(cat => product.category.toUpperCase() === cat);
      return mainCategoryMatch && categoryMatch;
    });
  }, [filters]);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 neon-text">Todos los Productos</h1>
        
        <ProductFilters
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {filteredProducts.length > 0 ? (
          <ProductList
            products={filteredProducts}
            onCardClick={setSelectedProduct}
          />
        ) : (
          <div className="text-center py-16 bg-dark/30 rounded-lg">
            <p className="text-xl text-neutral/80">No se encontraron productos con los filtros seleccionados.</p>
          </div>
        )}
      </div>

      <ProductModal 
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </>
  );
};
