import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative text-lg font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-neutral'}`;

  return (
    <header className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logomeg.webp" alt="MEG Computers Logo" className="h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-2xl text-primary text-center">MEG</span>
              <span className="text-sm text-neutral">Computers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkClasses}>Inicio</NavLink>
            <NavLink to="/productos" className={navLinkClasses}>Productos</NavLink>
            <NavLink to="/nosotros" className={navLinkClasses}>Nosotros</NavLink>
            <NavLink to="/contacto" className={navLinkClasses}>Contacto</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/carrito" className="relative p-2 text-neutral hover:text-primary transition-colors">
              <FiShoppingCart className="w-7 h-7" />
              {cart.totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-accent text-black text-xs font-bold rounded-full"
                >
                  {cart.totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-neutral hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu className="w-6 h-6 text-neutral" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark/95 backdrop-blur-md border-t border-primary/20 overflow-hidden"
            >
              <nav className="py-4 space-y-4">
                <Link
                  to="/"
                  className="block px-4 py-2 text-neutral hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/productos"
                  className="block px-4 py-2 text-neutral hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link
                  to="/nosotros"
                  className="block px-4 py-2 text-neutral hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link
                  to="/contacto"
                  className="block px-4 py-2 text-neutral hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
