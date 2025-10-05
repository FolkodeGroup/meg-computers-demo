import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductModal } from '../components/ProductModal';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { useCart } from '../hooks/useCart';
import type { Product } from '../types/product';

export const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-80 md:h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/meg.webp')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        
        {/* Decorative brush strokes */}
        <div className="absolute top-10 left-10 w-32 h-32 brush-overlay"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 brush-overlay transform rotate-180"></div>
      </section>

      {/* Hero Text Section */}
      <section className="container mx-auto px-4 text-center relative z-10 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-12 section-title pb-4">Repuestos Mayoristas</h1>
          <p className="text-xl md:text-2xl text-neutral/90 mb-8 max-w-3xl mx-auto">Encuentra los mejores repuestos para celulares con stock garantizado</p>
          <Link to="/productos" className="inline-block px-8 py-4 bg-primary text-dark rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors glow-effect">
            Explorar productos
          </Link>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="pt-8 pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Productos Destacados</h2>
          <FeaturedCarousel
            products={products.slice(0, 4)}
            onCardClick={setSelectedProduct}
          />
          <div className="text-center mt-10">
            <Link
              to="/productos"
              className="inline-block px-6 py-3 bg-primary/20 text-primary rounded-lg font-medium border border-primary/30 hover:bg-primary/30 transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-dark/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">¿Por qué elegirnos?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="bg-dark/30 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Stock Garantizado</h3>
                <p className="text-neutral/80">Mantenemos inventario constante de los repuestos más demandados.</p>
              </div>
              <div className="bg-dark/30 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-bold mb-3">Entrega Rápida</h3>
                <p className="text-neutral/80">Despachamos tu pedido en menos de 24 horas hábiles.</p>
              </div>
              <div className="bg-dark/30 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-bold mb-3">Garantía</h3>
                <p className="text-neutral/80">Todos nuestros productos tienen garantía de calidad.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductModal 
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};
