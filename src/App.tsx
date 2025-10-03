import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { ContactPage } from './pages/ContactPage'; // Aseguramos que se importe
import { CartProvider } from './CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="bg-dark text-neutral min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ProductPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="*" element={<Home />} /> {/* Fallback a Home */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;