import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import type { Product } from '../types/product';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.thumbnail || '');

  React.useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);
      setQuantity(1);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product.id, quantity);
      onClose(); // Cierra el modal después de agregar
    }
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-dark rounded-lg max-w-3xl w-full max-h-[90vh] lg:max-h-[650px] overflow-y-auto p-6 border border-primary/30 relative modal-sun-effect"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative z-10">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 hover:bg-dark/50 rounded-full transition-colors z-10"
            >
              <FiX className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Galería de Imágenes */}
            <div className="flex flex-col space-y-3">
              <div className="relative overflow-hidden rounded-lg bg-dark/30 p-2 aspect-[4/5] max-h-[300px] flex items-center justify-center">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain rounded-md"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {[product.thumbnail, ...product.images.filter(img => img !== product.thumbnail)].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} - vista ${index + 1}`}                      
                      className={`w-16 h-16 object-contain rounded-md cursor-pointer hover:opacity-80 transition-opacity bg-dark/20 p-1 ${mainImage === image ? 'border-2 border-primary' : 'border-2 border-transparent'}`}
                      onClick={() => setMainImage(image)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Detalles del Producto */}
            <div className="flex flex-col space-y-4">
              <div>
                <h1 className="text-2xl font-bold mb-2 neon-text">{product.name}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-neutral/80">
                  <span>Marca: <span className="font-semibold text-neutral/90">{product.brand}</span></span>
                  <span>Categoría: <span className="font-semibold text-neutral/90">{product.category}</span></span>
                  <span>SKU: <span className="font-semibold text-neutral/90">{product.sku}</span></span>
                </div>
              </div>
              
              <div className="bg-dark/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-base">Descripción</h3>
                <p className="text-neutral/80 text-sm max-h-24 overflow-y-auto pr-2">{product.description}</p>
              </div>
              
              <div className="bg-dark/30 p-4 rounded-lg mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold">Stock disponible:</span>
                  <span className={`font-bold ${
                    product.stock > 5 ? 'text-green-500' : product.stock > 0 ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {product.stock > 0 ? `${product.stock} unidades` : 'Agotado'}
                  </span>
                </div>
                
                {product.stock > 0 && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="quantity-modal" className="block mb-2 font-medium">
                        Cantidad:
                      </label>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-dark/50 rounded-lg flex items-center justify-center hover:bg-dark/70 transition-colors"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="w-10 h-10 bg-dark/50 rounded-lg flex items-center justify-center hover:bg-dark/70 transition-colors"
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="w-full py-2.5 bg-primary text-dark rounded-lg font-bold text-base hover:bg-primary/90 transition-colors glow-effect"
                    >
                      Agregar al pedido
                    </motion.button>
                  </>
                )}
              </div>
            </div>
                      </div>
                    </div>
                  </motion.div>      </motion.div>
    </AnimatePresence>
  );
};